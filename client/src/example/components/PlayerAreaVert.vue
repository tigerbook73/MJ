<template>
  <div class="column flex-center q-pa-xs" :class="{ reverse: bottomToTop }">
    <div class="hx-20 column justify-between items-center" :class="{ reverse: bottomToTop }">
      <div class="column items-center q-gutter-xs" :class="{ reverse: bottomToTop }">
        <div
          v-for="set in openTiles"
          :key="set[0]!.compId"
          class="col items-center q-gutter-xs"
          :class="{ reverse: bottomToTop }"
        >
          <div class="col items-center">
            <game-tile v-for="tile in set" :key="tile.compId" :tile="tile" :size="size"></game-tile>
          </div>
        </div>
      </div>

      <div class="column justify-end items-center" :class="{ reverse: bottomToTop }">
        <game-tile v-for="tile in handTiles" :key="tile.compId" :tile="tile"></game-tile>
      </div>
    </div>
    <div class="hx-4"></div>
  </div>
</template>

<script lang="ts">
export default { name: "PlayerAreaVert" };
</script>

<script setup lang="ts">
import { TileCore } from "@common/core/mj.tile-core";
import type { GameTileProp } from "./GameTile.vue";
import GameTile from "./GameTile.vue";
import { computed } from "vue";
import { CommonUtil, Direction } from "../common/common";
import { useExampleStore } from "../stores/example-store";
import { Position } from "src/common/core/mj.game";

// define props
const props = defineProps<{
  direction: typeof Direction.Left | typeof Direction.Right;
}>();

const exampleStore = useExampleStore();

const size = "md";

const bottomToTop = props.direction === Direction.Right;

const handTiles = computed((): GameTileProp[] => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, props.direction);
  const player = exampleStore.currentGame!.players[position];
  if (!player) {
    return [];
  }

  const tileIds = player.handTiles.slice();
  tileIds.push(TileCore.voidId);
  tileIds.push(player.picked);
  return tileIds.map(
    (tileId, index): GameTileProp => ({
      id: tileId,
      compId: tileId !== TileCore.voidId ? tileId : index + 1000,
      direction: props.direction,
      size,
      back: !exampleStore.open,
      selected: false,
    }),
  );
});

const openTiles = computed<GameTileProp[][]>(() => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition ?? Position.None, props.direction);
  const player = exampleStore.currentGame!.players[position]!;
  const tiless = player.openedSets.map((set): GameTileProp[] =>
    set.tiles.map((tileId, index): GameTileProp => {
      return {
        id: tileId,
        compId: tileId !== TileCore.voidId ? tileId : index + 1000,
        direction: props.direction,
        size,
        back: false,
        selected: false,
      };
    }),
  );
  return tiless;
});
</script>

<style scoped></style>
