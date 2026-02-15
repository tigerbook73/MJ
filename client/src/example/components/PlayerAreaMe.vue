<template>
  <div class="row flex-center">
    <div class="wx-20 row justify-between">
      <div class="row flex-center q-gutter-xs">
        <div v-for="set in openTiles" :key="set[0]!.compId" class="row items-center q-gutter-xs">
          <div class="row items-center">
            <game-tile v-for="tile in set" :key="tile.compId" :tile="tile" :size="size"></game-tile>
          </div>
        </div>
      </div>

      <div class="row justify-end items-center">
        <game-tile
          v-for="tile in handTiles"
          :key="tile.compId"
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
      <q-btn v-if="showHu.show" :disable="showHu.disabled" @click="handleHu" dense label="胡" color="dark" />
    </div>
  </div>
</template>

<script lang="ts">
const State = {
  None: 0,
  MyTurn: 1,
  WaitingPass: 2,
} as const;

interface ShowState {
  show: boolean;
  disabled: boolean;
}

function canDo(showState: ShowState) {
  return showState.show && !showState.disabled;
}
</script>

<script setup lang="ts">
import type { TileId } from "@mj/shared";
import { TileCore, Position, GameState } from "@mj/shared";
import type { GameTileProp } from "./GameTile.vue";
import GameTile from "./GameTile.vue";
import { computed, ref } from "vue";
import { CommonUtil, Direction } from "../common/common";
import { useExampleStore } from "../stores/example-store";
import { socketClient } from "src/client/socket-client";
import { useQuasar } from "quasar";

const $q = useQuasar();
const exampleStore = useExampleStore();

const size = "md";

const handTiles = computed<GameTileProp[]>(() => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition ?? Position.None, Direction.Bottom);
  const player = exampleStore.currentGame!.players[position]!;
  const tileIds = player.handTiles.slice();
  tileIds.push(TileCore.voidId);
  tileIds.push(player.picked);
  return tileIds.map(
    (tileId, index): GameTileProp => ({
      id: tileId,
      compId: tileId !== TileCore.voidId ? tileId : index + 1000,
      direction: Direction.Bottom,
      size,
      back: false,
      selected: selectedTiles.value.includes(tileId),
    }),
  );
});

const openTiles = computed<GameTileProp[][]>(() => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition ?? Position.None, Direction.Bottom);
  const player = exampleStore.currentGame!.players[position]!;
  const tiless = player.openedSets.map((set): GameTileProp[] =>
    set.tiles.map((tileId, index): GameTileProp => {
      return {
        id: tileId,
        compId: tileId !== TileCore.voidId ? tileId : index + 1000,
        direction: Direction.Bottom,
        size,
        back: false,
        selected: selectedTiles.value.includes(tileId),
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

  // if the tile is not in hand, do nothing
  if (handTiles.value.every((tile) => tile.id !== tileId)) {
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
    // delay unselect to avoid double click
    setTimeout(() => {
      setSelected(tileId);
    }, 100);
    return;
  }

  // in state waiting pass
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
    if (selectedTiles.value[0] === tileId) {
      handleDrop();
    }
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
      socketClient.actionDrop(selectedTiles.value[0]);
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
      socketClient.actionZimo();
      clearSelected();
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
      socketClient.actionPass();
      clearSelected();
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
      socketClient.actionPeng([selectedTiles.value[0], selectedTiles.value[1]]);
      clearSelected();
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
      socketClient.actionGang([selectedTiles.value[0], selectedTiles.value[1], selectedTiles.value[2]]);
      clearSelected();
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
      socketClient.actionChi([selectedTiles.value[0], selectedTiles.value[1]]);
      clearSelected();
    } catch (e) {
      $q.notify({
        message: "Chi failed",
        color: "negative",
        icon: "warning",
      });
    }
  }
}

//
// hu feature
//

const showHu = computed<ShowState>(() => {
  if (state.value !== State.WaitingPass) {
    return {
      show: false,
      disabled: false,
    };
  }

  const player = exampleStore.currentGame!.players[exampleStore.currentPosition!]!;
  const latestTile = exampleStore.currentGame!.latestTile;
  return {
    show: TileCore.canHu(player.handTiles, latestTile),
    disabled: false,
  };
});

function handleHu() {
  if (canDo(showHu.value)) {
    try {
      socketClient.actionHu();
    } catch (e) {
      $q.notify({
        message: "Hu failed",
        color: "negative",
        icon: "warning",
      });
    }
  }
}
</script>

<style scoped></style>
