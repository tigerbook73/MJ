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
import type { GameTileProp } from "./GameTile.vue";
import GameTile from "./GameTile.vue";
import { computed } from "vue";
import { CommonUtil, Direction } from "../common/common";
import { useExampleStore } from "../stores/example-store";

// define props
const props = defineProps<{
  direction: Direction.Left | Direction.Right;
}>();

const exampleStore = useExampleStore();

const size = "sm";
const bottomToTop = computed(() => props.direction === Direction.Left);
const leftRow = computed(() => {
  const remainder = props.direction === Direction.Right ? 0 : 1; // even elements
  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, props.direction);
  return exampleStore
    .currentGame!.walls[position]!.tiles.filter((_, i) => i % 2 === remainder)
    .map(
      (tileId): GameTileProp => ({
        id: tileId,
        direction: props.direction,
        size,
        back: !exampleStore.open,
        selected: false,
      }),
    );
});
const rightRow = computed(() => {
  const remainder = props.direction === Direction.Right ? 1 : 0; // odd elements
  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, props.direction);
  return exampleStore
    .currentGame!.walls[position]!.tiles.filter((_, i) => i % 2 === remainder)
    .map(
      (tileId): GameTileProp => ({
        id: tileId,
        direction: props.direction,
        size,
        back: !exampleStore.open,
        selected: false,
      }),
    );
});
</script>

<style scoped></style>
