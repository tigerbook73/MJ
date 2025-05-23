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

const bottomToTop = props.direction === Direction.Right;

const tiles = computed((): GameTileProp[] => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, props.direction);
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
      direction: props.direction,
      size: "sm",
      back: !exampleStore.open,
      selected: false,
    }),
  );
});
</script>

<style scoped></style>
