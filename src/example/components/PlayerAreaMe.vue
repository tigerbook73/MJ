<template>
  <div class="row flex-center">
    <div class="wx-20 row flex-center">
      <div class="col">
        <div v-for="set in openTiles" :key="set[0].id" class="row items-center q-gutter-xs">
          <div class="row items-center">
            <game-tile v-for="tile in set" :key="tile.id" :tile="tile" :size="size"></game-tile>
          </div>
        </div>
      </div>

      <div class="row justify-end items-center">
        <game-tile
          v-for="tile in handTiles"
          :key="tile.id"
          :tile="tile"
          @click.stop="handleClick(tile.id)"
          @dblclick.stop="handleDblClick(tile.id)"
        ></game-tile>
      </div>
    </div>
    <div class="wx-4 row flex-center q-gutter-xs">
      <q-btn v-if="showDrop.show" :disable="showDrop.disabled" @click="handleDrop" dense label="出牌" color="dark" />
      <q-btn v-if="showZimo.show" :disable="showZimo.disabled" @click="handleZimo" dense label="自摸" color="dark" />
      <q-btn v-if="showPass.show" :disable="showPass.disabled" @click="handlePass" dense label="过" color="dark" />
      <q-btn v-if="showGang.show" :disable="showGang.disabled" @click="handleGang" dense label="杠" color="dark" />
      <q-btn v-if="showPeng.show" :disable="showPeng.disabled" @click="handlePeng" dense label="碰" color="dark" />
      <q-btn v-if="showChi.show" :disable="showChi.disabled" @click="handleChi" dense label="吃" color="dark" />
    </div>
  </div>
</template>

<script lang="ts">
enum State {
  None = 0,
  MyTurn = 1,
  WaitingPass = 2,
}

interface ShowState {
  show: boolean;
  disabled: boolean;
}

function canDo(showState: ShowState) {
  return showState.show && !showState.disabled;
}
</script>

<script setup lang="ts">
import type { TileId } from "src/common/core/mj.tile-core";
import { TileCore } from "src/common/core/mj.tile-core";
import type { GameTileProp } from "./GameTile.vue";
import GameTile from "./GameTile.vue";
import { computed, ref } from "vue";
import { CommonUtil, Direction } from "../common/common";
import { useExampleStore } from "../stores/example-store";
import type { Position } from "src/common/core/mj.game";
import { GameState } from "src/common/core/mj.game";
import { clientApi } from "src/client/client-api";
import { useQuasar } from "quasar";

const $q = useQuasar();
const exampleStore = useExampleStore();

const size = "md";

const handTiles = computed<GameTileProp[]>(() => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, Direction.Bottom);
  const player = exampleStore.currentGame!.players[position]!;
  const tileIds = player.handTiles.slice();
  tileIds.push(TileCore.voidId);
  tileIds.push(player.picked);
  return tileIds.map(
    (id): GameTileProp => ({
      id,
      direction: Direction.Bottom,
      size,
      back: false,
      selected: selectedTiles.value.includes(id),
    }),
  );
});

const openTiles = computed<GameTileProp[][]>(() => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, Direction.Bottom);
  const player = exampleStore.currentGame!.players[position]!;
  const tiless = player.openedSets.map((set): GameTileProp[] =>
    set.tiles.map((tile): GameTileProp => {
      return {
        id: tile,
        direction: Direction.Bottom,
        size,
        back: false,
        selected: selectedTiles.value.includes(tile),
      };
    }),
  );
  return tiless;
});

// game state
const state = computed(() => {
  const game = exampleStore.currentGame!;
  if (game.state === GameState.WaitingAction && game.current!.position === exampleStore.currentPosition) {
    return State.MyTurn;
  } else if (game.state === GameState.WaitingPass && game.current!.position !== exampleStore.currentPosition) {
    // if it is not my turn, but waiting for mypass
    return State.WaitingPass;
  } else {
    return State.None;
  }
});

// selected
const selectedTiles = ref<TileId[]>([]);
function setSelected(tileId: TileId) {
  if (tileId === TileCore.voidId) {
    return;
  }

  const index = selectedTiles.value.indexOf(tileId);
  if (index === -1) {
    selectedTiles.value = [tileId];
  } else {
    selectedTiles.value = [];
  }
}

function addSelected(tileId: TileId) {
  if (tileId === TileCore.voidId) {
    return;
  }

  const index = selectedTiles.value.indexOf(tileId);
  if (index === -1) {
    selectedTiles.value.push(tileId);
  } else {
    selectedTiles.value.splice(index, 1);
  }
}

function clearSelected() {
  selectedTiles.value = [];
}

function handleClick(tileId: TileId) {
  if (tileId === TileCore.voidId) {
    return;
  }

  // in state my turn
  if (state.value === State.MyTurn) {
    setSelected(tileId);
    return;
  }

  // in state waitiing pass, chi / peng / hu / gang is not supported now
  if (state.value === State.WaitingPass) {
    addSelected(tileId);
    return;
  }
}

function handleDblClick(tileId: TileId) {
  if (tileId === TileCore.voidId) {
    return;
  }

  // in state my turn
  if (state.value === State.MyTurn) {
    setSelected(tileId);
    handleDrop();
    return;
  }

  // in state waitiing pass, chi / peng / hu / gang is not supported now
  if (state.value === State.WaitingPass) {
    // ...
  }
}

//
// drop tile feature
//
const showDrop = computed<ShowState>(() => {
  return {
    show: state.value === State.MyTurn,
    disabled: selectedTiles.value.length !== 1,
  };
});

//
function handleDrop() {
  if (canDo(showDrop.value)) {
    try {
      clientApi.actionDrop(selectedTiles.value[0]);
      clearSelected();
    } catch (e) {
      $q.notify({
        message: "Drop failed",
        color: "negative",
        icon: "warning",
      });
    }
  }
}

//
// zimo feature
//
const showZimo = computed<ShowState>(() => {
  if (state.value === State.MyTurn) {
    const player = exampleStore.currentGame!.players[exampleStore.currentPosition!]!;
    return {
      show: TileCore.canHu(player.handTiles, player.picked),
      disabled: false,
    };
  }
  return {
    show: false,
    disabled: false,
  };
});

function handleZimo() {
  if (canDo(showZimo.value)) {
    try {
      clientApi.actionZimo();
    } catch (e) {
      $q.notify({
        message: "Zimo failed",
        color: "negative",
        icon: "warning",
      });
    }
  }
}

//
// pass feature
//
const showPass = computed(() => {
  return {
    show: state.value === State.WaitingPass,
    disabled: false,
  };
});
function handlePass() {
  if (showPass.value) {
    try {
      clientApi.actionPass();
    } catch (e) {
      $q.notify({
        message: "Pass failed",
        color: "negative",
        icon: "warning",
      });
    }
  }
}

//
// peng feature
//
const showPeng = computed<ShowState>(() => {
  if (state.value !== State.WaitingPass) {
    return {
      show: false,
      disabled: false,
    };
  }

  const player = exampleStore.currentGame!.players[exampleStore.currentPosition!]!;
  const latestTile = exampleStore.currentGame!.latestTile;
  return {
    show: TileCore.canPeng(player.handTiles, latestTile),
    disabled:
      selectedTiles.value.length !== 2 || !TileCore.isSame(selectedTiles.value[0], selectedTiles.value[1], latestTile),
  };
});

function handlePeng() {
  const game = exampleStore.currentGame!;
  if (canDo(showPeng.value)) {
    try {
      clientApi.actionPeng([selectedTiles.value[0], selectedTiles.value[1]]);
    } catch (e) {
      $q.notify({
        message: "Peng failed",
        color: "negative",
        icon: "warning",
      });
    }
  }
}

//
// gang feature
//
const showGang = computed<ShowState>(() => {
  if (state.value !== State.WaitingPass) {
    return {
      show: false,
      disabled: false,
    };
  }

  const player = exampleStore.currentGame!.players[exampleStore.currentPosition!]!;
  const latestTile = exampleStore.currentGame!.latestTile;
  return {
    show: TileCore.canGang(player.handTiles, latestTile),
    disabled:
      selectedTiles.value.length !== 3 ||
      !TileCore.isSame(selectedTiles.value[0], selectedTiles.value[1], selectedTiles.value[2], latestTile),
  };
});

function handleGang() {
  const game = exampleStore.currentGame!;
  if (canDo(showGang.value)) {
    try {
      clientApi.actionGang([selectedTiles.value[0], selectedTiles.value[1], selectedTiles.value[2]]);
    } catch (e) {
      $q.notify({
        message: "Gang failed",
        color: "negative",
        icon: "warning",
      });
    }
  }
}

//
// chi feature
//
const showChi = computed<ShowState>(() => {
  if (state.value !== State.WaitingPass) {
    return {
      show: false,
      disabled: false,
    };
  }

  const player = exampleStore.currentGame!.players[exampleStore.currentPosition!]!;
  const currentPlayer = exampleStore.currentGame!.current!;
  // find the next player
  let nextPosition = (currentPlayer.position - 1 + 4) % 4;
  while (!exampleStore.currentGame!.players[nextPosition]) {
    nextPosition = (nextPosition - 1 + 4) % 4;
  }
  // player is the next player
  if (player.position !== (nextPosition as Position)) {
    return {
      show: false,
      disabled: false,
    };
  }

  const latestTile = exampleStore.currentGame!.latestTile;
  return {
    show: TileCore.canChi(player.handTiles, latestTile),
    disabled:
      selectedTiles.value.length !== 2 ||
      !TileCore.isConsecutive(selectedTiles.value[0], selectedTiles.value[1], latestTile),
  };
});

function handleChi() {
  const game = exampleStore.currentGame!;
  if (canDo(showChi.value)) {
    try {
      clientApi.actionChi([selectedTiles.value[0], selectedTiles.value[1]]);
    } catch (e) {
      $q.notify({
        message: "Chi failed",
        color: "negative",
        icon: "warning",
      });
    }
  }
}
</script>

<style scoped></style>
