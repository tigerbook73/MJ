<template>
  <div class="row flex-center">
    <div class="wx-4"></div>
    <div class="wx-16 row flex-center">
      <game-tile
        v-for="tile in tiles"
        :key="tile.id"
        :tile="tile"
        @click.stop="handleClick(tile.id)"
        @dblclick.stop="handleDropClick(tile.id)"
      ></game-tile>
    </div>
    <div class="wx-4 row flex-center">
      <q-btn v-if="showDrop" @click="handleDrop" dense label="DROP" color="dark" />
      <q-btn v-if="showHu" @click="handleHu" dense label="Hu" color="dark" />
      <q-btn v-if="showPass" @click="handlePass" dense label="Pass" color="dark" />
    </div>
  </div>
</template>

<script lang="ts">
enum State {
  None = 0,
  MyTurn = 1,
  WaitingPass = 2,
}
</script>

<script setup lang="ts">
import { TileCore, TileId } from "src/common/core/mj.tile-core";
import GameTile, { GameTileProp } from "./GameTile.vue";
import { computed, ref } from "vue";
import { CommonUtil, Direction } from "../common/common";
import { useExampleStore } from "../stores/example-store";
import { GameState } from "src/common/core/mj.game";
import { clientApi } from "src/client/client-api";
import { useQuasar } from "quasar";

const $q = useQuasar();
const exampleStore = useExampleStore();

const size = "md";

const tiles = computed<GameTileProp[]>(() => {
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
function selectToDrop(tileId: TileId) {
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

function handleClick(tileId: TileId) {
  // in state my turn
  if (state.value === State.MyTurn) {
    selectToDrop(tileId);
    return;
  }

  // in state waitiing pass, chi / peng / hu / gang is not supported now
  if (state.value === State.WaitingPass) {
    return;
  }
}

// drop tile feature
const showDrop = computed(() => state.value === State.MyTurn && selectedTiles.value.length > 0);
function handleDropClick(tileId: TileId) {
  if (tileId === TileCore.voidId) {
    return;
  }

  if (state.value === State.MyTurn) {
    try {
      clientApi.actionDrop(tileId); // Use the tileId parameter instead of selectedTiles.value[0]
    } catch (e) {
      $q.notify({
        message: "Drop failed",
        color: "negative",
        icon: "warning",
      });
    }
  }
}

// drop button
function handleDrop() {
  handleDropClick(selectedTiles.value[0]);
}

// hu feature
const showHu = computed(() => {
  if (state.value === State.MyTurn) {
    const game = exampleStore.currentGame!;
    const player = exampleStore.currentGame!.current!;
    const tiles = player.handTiles.slice();
    if (player.picked !== TileCore.voidId) {
      tiles.push(player.picked);
    }
    return game.canHu(tiles);
  }
  return false;
});

function handleHu() {
  const game = exampleStore.currentGame!;
  if (showHu.value) {
    try {
      clientApi.actionHu();
    } catch (e) {
      $q.notify({
        message: "Hu failed",
        color: "negative",
        icon: "warning",
      });
    }
  }
}

// pass feature
const showPass = computed(() => state.value === State.WaitingPass);
function handlePass() {
  const game = exampleStore.currentGame!;
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
</script>

<style scoped></style>
