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
import type { GameTileProp } from "./GameTile.vue";
import GameTile from "./GameTile.vue";
import { computed } from "vue";
import { useExampleStore } from "../stores/example-store";
import { CommonUtil, Direction } from "../common/common";

// define props
const props = defineProps<{
  direction: Direction.Bottom | Direction.Top;
}>();

const exampleStore = useExampleStore();

const size = "sm";
const rightToLeft = computed(() => props.direction === Direction.Bottom);

const upperRow = computed(() => {
  const remainder = props.direction === Direction.Bottom ? 0 : 1; // even elements
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

const lowerRow = computed(() => {
  const remainder = props.direction === Direction.Bottom ? 1 : 0; // odd elements
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
