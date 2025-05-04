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
export default { name: "WallAreaHori" };
</script>

<script setup lang="ts">
import GameTile, { GameTileProp } from "./GameTile.vue";
import { computed } from "vue";
import { useExampleStore } from "../stores/example-store";
import { CommonUtil, Direction } from "../common/common";

const exampleStore = useExampleStore();

// define props
const props = defineProps<{
  direction: Direction.Bottom | Direction.Top;
}>();
const size = "sm";

const rightToLeft = computed(() => props.direction === Direction.Bottom);
const upperRow = computed(() => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, props.direction);
  const tiles = exampleStore.currentGame!.walls[position].tiles.map(
    (tileId): GameTileProp => ({
      id: tileId,
      direction: props.direction,
      size,
      back: false,
      selected: false,
    }),
  );
  return props.direction === Direction.Bottom ? tiles.filter((_, i) => i % 2 == 0) : tiles.filter((_, i) => i % 2 == 1);
});
const lowerRow = computed(() => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, props.direction);
  const tiles = exampleStore.currentGame!.walls[position].tiles.map(
    (tileId): GameTileProp => ({
      id: tileId,
      direction: props.direction,
      size,
      back: false,
      selected: false,
    }),
  );
  return props.direction === Direction.Bottom ? tiles.filter((_, i) => i % 2 == 1) : tiles.filter((_, i) => i % 2 == 0);
});
</script>

<style scoped></style>
