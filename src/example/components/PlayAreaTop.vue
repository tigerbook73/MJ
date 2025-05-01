<template>
  <div class="row flex-center" :class="{ reverse: true }">
    <game-tile v-for="tile in tiles" :key="tile.id" :tile="tile"></game-tile>
  </div>
</template>

<script lang="ts">
export default { name: "WallAreaHori" };
</script>

<script setup lang="ts">
import { TileCore } from "src/common/core/mj.tile-core";
import GameTile, { GameTileProp } from "./GameTile.vue";
import { onMounted, onUnmounted, reactive } from "vue";

const size = "md";
const rowLength = 15;

const tiles = reactive(
  Array.from({ length: rowLength }, (_, i): GameTileProp => {
    return {
      id: (i * 7) % TileCore.allTiles.length,
      position: "top",
      size: size,
      back: false,
    };
  }),
);
tiles[13].id = TileCore.voidId;

/**
 * the following is test code
 */
let intervalId: NodeJS.Timeout;
onMounted(() => {
  let index = 0;
  intervalId = setInterval(() => {
    if (index !== 0) {
      tiles[(index - 1) % tiles.length].back = !tiles[(index - 1) % tiles.length].back;
    }
    tiles[index % tiles.length].back = !tiles[index % tiles.length].back;
    index++;
  }, 500);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped></style>
