<template>
  <div class="column flex-center">
    <div class="row" :class="{ reverse: rightToLeft }">
      <game-tile v-for="tile in upperRow" :key="tile.id" :tile="tile"></game-tile>
    </div>
    <div class="row" :class="{ reverse: rightToLeft }">
      <game-tile v-for="tile in lowerRow" :key="tile.id" :tile="tile"></game-tile>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "DiscardAreaHori" };
</script>

<script setup lang="ts">
import { TileCore } from "src/common/core/mj.tile-core";
import GameTile, { GameTileProp } from "./GameTile.vue";
import { computed, onMounted, onUnmounted, reactive } from "vue";

// define props
const props = defineProps<{
  position: "top" | "bottom";
}>();
const size = "sm";
const rowLength = 12;

const discardTiles = reactive(
  Array.from({ length: rowLength * 2 }, (_, i): GameTileProp => {
    return {
      id: TileCore.voidId,
      position: props.position,
      size: size,
      back: false,
    };
  }),
);
const rightToLeft = computed(() => props.position === "top");
const upperRow = computed(() =>
  props.position === "bottom" ? discardTiles.slice(0, rowLength) : discardTiles.slice(rowLength, rowLength * 2),
);
const lowerRow = computed(() =>
  props.position === "bottom" ? discardTiles.slice(rowLength, rowLength * 2) : discardTiles.slice(0, rowLength),
);

/**
 * the following is test code
 */
let intervalId: NodeJS.Timeout;
onMounted(() => {
  let index = 0;
  let action: "set" | "clear" = "set";
  intervalId = setInterval(() => {
    discardTiles[index % discardTiles.length].id =
      action === "set" ? (index * 7) % TileCore.allTiles.length : TileCore.voidId;
    index++;
    if (index % discardTiles.length === 0) {
      action = action === "set" ? "clear" : "set";
    }
  }, 500);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped></style>
