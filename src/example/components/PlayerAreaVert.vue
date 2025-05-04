<template>
  <div class="column flex-center" :class="{ reverse: bottomToTop }">
    <game-tile v-for="tile in tiles" :key="tile.id" :tile="tile"></game-tile>
  </div>
</template>

<script lang="ts">
export default { name: "PlayerAreaVert" };
</script>

<script setup lang="ts">
import { TileCore } from "src/common/core/mj.tile-core";
import GameTile, { GameTileProp } from "./GameTile.vue";
import { computed, onMounted, onUnmounted, reactive } from "vue";
import { Direction } from "../common/common";

// define props
const props = defineProps<{
  direction: Direction.Left | Direction.Right;
}>();
const size = "sm";
const rowLength = 15;

const tiles = reactive(
  Array.from({ length: rowLength }, (_, i): GameTileProp => {
    return {
      id: (i * 4) % TileCore.allTiles.length,
      direction: props.direction,
      size: size,
      back: false,
    };
  }),
);
tiles[13].id = TileCore.voidId;

const bottomToTop = computed(() => props.direction === Direction.Right);

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
