<template>
  <div class="row flex-center">
    <div class="wx-4"></div>
    <div class="wx-20 row justify-between" :class="{ reverse: true }">
      <div class="row items-center q-gutter-xs q-pr-sm" :class="{ reverse: true }">
        <div
          v-for="set in openTiles"
          :key="set[0]!.compId"
          class="row items-center q-gutter-xs"
          :class="{ reverse: true }"
        >
          <div class="row items-center">
            <game-tile v-for="tile in set" :key="tile.compId" :tile="tile" :size="size"></game-tile>
          </div>
        </div>
      </div>

      <div class="row justify-end items-center" :class="{ reverse: true }">
        <game-tile v-for="tile in handTiles" :key="tile.compId" :tile="tile"></game-tile>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "PlayerAreaTop" };
</script>

<script setup lang="ts">
import { TileCore } from "@common/core/mj.tile-core";
import type { GameTileProp } from "./GameTile.vue";
import GameTile from "./GameTile.vue";
import { computed } from "vue";
import { CommonUtil, Direction } from "../common/common";
import { useExampleStore } from "../stores/example-store";
import { Position } from "src/common/core/mj.game";

const exampleStore = useExampleStore();

const size = "md";

const handTiles = computed(() => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition!, Direction.Top);
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
      direction: Direction.Top,
      size,
      back: !exampleStore.open,
      selected: false,
    }),
  );
});

const openTiles = computed<GameTileProp[][]>(() => {
  const position = CommonUtil.mapPosition(exampleStore.currentPosition ?? Position.None, Direction.Top);
  const player = exampleStore.currentGame!.players[position]!;
  const tiless = player.openedSets.map((set): GameTileProp[] =>
    set.tiles.map((tileId, index): GameTileProp => {
      return {
        id: tileId,
        compId: tileId !== TileCore.voidId ? tileId : index + 1000,
        direction: Direction.Top,
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
