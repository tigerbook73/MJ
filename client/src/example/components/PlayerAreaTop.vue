<template>
  <div class="row flex-center" :class="{ reverse: true }">
    <game-tile v-for="tile in tiles" :key="tile.id" :tile="tile"></game-tile>
  </div>
</template>

<script lang="ts">
export default { name: "PlayerAreaTop" };
</script>

<script setup lang="ts">
import { TileCore } from "@common/core/mj.tile-core";
import type { GameTileProp } from "./GameTile.vue";
import GameTile from "./GameTile.vue";
import { computed } from "vue";
import { CommonUtil, Direction } from "../common/common";
import { useExampleStore } from "../stores/example-store";

const exampleStore = useExampleStore();

const size = "md";

const tiles = computed(() => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, Direction.Top);
  const player = exampleStore.currentGame!.players[position];
  if (!player) {
    return [];
  }

  const tileIds = player.handTiles.slice();
  tileIds.push(TileCore.voidId);
  tileIds.push(player.picked);
  return tileIds.map(
    (id): GameTileProp => ({
      id,
      direction: Direction.Top,
      size,
      back: !exampleStore.open,
      selected: false,
    }),
  );
});
</script>

<style scoped></style>
