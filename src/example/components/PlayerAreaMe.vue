<template>
  <div class="row flex-center">
    <div class="wx-4"></div>
    <div class="wx-16 row flex-center">
      <game-tile v-for="tile in tiles" :key="tile.id" :tile="tile" @click.stop="handleClick(tile.id)"></game-tile>
    </div>
    <div class="wx-4 row flex-center">
      <q-btn @click="handleDrop" dense flat label="DROP" color="dark" />
      <q-btn @click="handlePass" dense flat label="Pass" color="dark" />
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "PlayerAreaMe" };
</script>

<script setup lang="ts">
import { TileCore, TileId } from "src/common/core/mj.tile-core";
import GameTile, { GameTileProp } from "./GameTile.vue";
import { computed, ref } from "vue";
import { CommonUtil, Direction } from "../common/common";
import { useExampleStore } from "../stores/example-store";
import { GameState } from "src/common/core/mj.game";
import { clientApi } from "src/client/client-api";

const exampleStore = useExampleStore();

const size = "md";

// selected
const selectedTiles = ref<TileId[]>([]);

const tiles = computed<GameTileProp[]>(() => {
  if (!exampleStore.currentGame) {
    return [];
  }

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

function selectToDrop(tileId: TileId) {
  const game = exampleStore.currentGame;
  if (!game) {
    return;
  }

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
  const game = exampleStore.currentGame;
  if (!game) {
    return;
  }

  // if it waiting for my action
  if (game.state === GameState.WaitingAction && game.current?.position === exampleStore.currentPosition) {
    selectToDrop(tileId);
    return;
  }

  // if to pass or to select
  //
}

function handleDrop() {
  //
  const game = exampleStore.currentGame!;
  if (game.state === GameState.WaitingAction && selectedTiles.value.length > 0) {
    clientApi.actionDrop(selectedTiles.value[0]);
  }
}

function handlePass() {
  //
  const game = exampleStore.currentGame!;
  if (game.state === GameState.WaitingPass) {
    clientApi.actionPass();
  }
}
</script>

<style scoped></style>
