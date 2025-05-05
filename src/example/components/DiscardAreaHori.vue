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
import GameTile, { GameTileProp } from "./GameTile.vue";
import { computed } from "vue";
import { CommonUtil, Direction } from "../common/common";
import { useExampleStore } from "../stores/example-store";

// define props
const props = defineProps<{
  direction: Direction.Top | Direction.Bottom;
}>();

const exampleStore = useExampleStore();
const size = "sm";
const rowLength = 12;
const rightToLeft = computed(() => props.direction === Direction.Top);

const upperRow = computed(() => {
  if (!exampleStore.currentGame) {
    return [];
  }

  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, props.direction);
  const tiles =
    props.direction === Direction.Bottom
      ? exampleStore.currentGame!.discards[position].tiles.slice(0, rowLength)
      : exampleStore.currentGame!.discards[position].tiles.slice(rowLength, rowLength * 2);
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

const lowerRow = computed(() => {
  if (!exampleStore.currentGame) {
    return [];
  }

  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, props.direction);
  const tiles =
    props.direction === Direction.Bottom
      ? exampleStore.currentGame!.discards[position].tiles.slice(rowLength, rowLength * 2)
      : exampleStore.currentGame!.discards[position].tiles.slice(0, rowLength);
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
