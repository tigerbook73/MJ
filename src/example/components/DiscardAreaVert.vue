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
export default { name: "DiscardAreaVert" };
</script>

<script setup lang="ts">
import type { GameTileProp } from "./GameTile.vue";
import GameTile from "./GameTile.vue";
import { computed } from "vue";
import { CommonUtil, Direction } from "../common/common";
import { useExampleStore } from "../stores/example-store";
import { TileCore } from "src/common/core/mj.tile-core";

// define props
const props = defineProps<{
  direction: Direction.Left | Direction.Right;
}>();

const exampleStore = useExampleStore();
const size = "sm";
const rowLength = 12;
const bottomToTop = computed(() => props.direction === Direction.Right);

const leftRow = computed(() => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, props.direction);
  const tileIds = CommonUtil.extendArrayToLength(
    exampleStore.currentGame!.discards[position].tiles,
    rowLength * 2,
    TileCore.voidId,
  );
  const tiles =
    props.direction === Direction.Right ? tileIds.slice(0, rowLength) : tileIds.slice(rowLength, rowLength * 2);
  return tiles.map(
    (tileId): GameTileProp => ({
      id: tileId,
      direction: props.direction,
      size,
      back: false,
      selected: false,
    }),
  );
});

const rightRow = computed(() => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, props.direction);
  const tileIds = CommonUtil.extendArrayToLength(
    exampleStore.currentGame!.discards[position].tiles,
    rowLength * 2,
    TileCore.voidId,
  );
  const tiles =
    props.direction === Direction.Right ? tileIds.slice(rowLength, rowLength * 2) : tileIds.slice(0, rowLength);
  return tiles.map(
    (tileId): GameTileProp => ({
      id: tileId,
      direction: props.direction,
      size,
      back: false,
      selected: false,
    }),
  );
});
</script>

<style scoped></style>
