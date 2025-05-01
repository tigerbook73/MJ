<template>
  <div class="row flex-center">
    <div class="column" :class="{ reverse: bottomToTop }">
      <game-tile v-for="tile in leftRow" :key="tile.id" :tile="tile"></game-tile>
    </div>
    <div class="column" :class="{ reverse: bottomToTop }">
      <game-tile v-for="tile in rightRow" :key="tile.id" :tile="tile"></game-tile>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "WallAreaHori" };
</script>

<script setup lang="ts">
import { TileCore } from "src/common/core/mj.tile-core";
import GameTile, { GameTileProp } from "./GameTile.vue";
import { computed, onMounted, onUnmounted, reactive } from "vue";

// define props
const props = defineProps<{
  position: "left" | "right";
}>();
const size = "sm";
const rowLength = 18;

const discardTiles = reactive(
  Array.from({ length: rowLength * 2 }, (_, i): GameTileProp => {
    return {
      id: (i * 4) % TileCore.allTiles.length,
      position: props.position,
      size: size,
      back: true,
    };
  }),
);
const bottomToTop = computed(() => props.position === "left");
const leftRow = computed(() =>
  props.position === "right" ? discardTiles.filter((_, i) => i % 2 == 0) : discardTiles.filter((_, i) => i % 2 == 1),
);
const rightRow = computed(() =>
  props.position === "right" ? discardTiles.filter((_, i) => i % 2 == 1) : discardTiles.filter((_, i) => i % 2 == 0),
);

/**
 * the following is test code
 */
let intervalId: NodeJS.Timeout;
onMounted(() => {
  let index = 0;
  intervalId = setInterval(() => {
    if (index !== 0) {
      discardTiles[(index - 1) % discardTiles.length].back = !discardTiles[(index - 1) % discardTiles.length].back;
    }
    discardTiles[index % discardTiles.length].back = !discardTiles[index % discardTiles.length].back;
    index++;
  }, 200);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped></style>
