<template>
  <div class="column square bg-purple-1">
    <!-- top -->
    <div class="h-3 row">
      <div class="w-3"></div>
      <div class="w-18 row flex-center bg-green-1">
        <game-tile v-for="i in 13" :key="i" :tile="defaultTopHand"></game-tile>
      </div>
      <div class="w-3"></div>
    </div>

    <!-- center -->
    <div class="h-18 row">
      <div class="w-3 column flex-center bg-green-1">
        <game-tile v-for="i in 13" :key="i" :tile="defaultLeftHand"></game-tile>
      </div>

      <wall-area class="w-18" />

      <div class="w-3 column flex-center bg-green-1">
        <game-tile v-for="i in 13" :key="i" :tile="defaultRightHand"></game-tile>
      </div>
    </div>

    <!-- bottom -->
    <div class="h-3 row">
      <div class="w-3"></div>
      <div class="w-18 row flex-center bg-green-1">
        <game-tile v-for="i in 13" :key="i" :tile="defaultBottomHand"></game-tile>
      </div>
      <div class="w-3"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "DiscardArea" };
</script>

<script setup lang="ts">
import { TileCore } from "src/common/core/mj.tile-core";
import GameTile, { GameTileProp } from "../components/GameTile.vue";
import WallArea from "../components/WallArea.vue";

const defaultBottomHand: GameTileProp = {
  id: TileCore.fromNameAndIndex("八万", 0).id,
  // id: TileCore.voidId,
  position: "bottom",
  back: false,
};
const defaultLeftHand: GameTileProp = {
  ...defaultBottomHand,
  position: "left",
  back: true,
};
const defaultRightHand: GameTileProp = {
  ...defaultBottomHand,
  position: "right",
  back: true,
};
const defaultTopHand: GameTileProp = {
  ...defaultBottomHand,
  position: "top",
  back: true,
};
</script>

<style scoped lang="scss">
.square {
  aspect-ratio: 1 / 1;
  width: 100%;
  max-width: 100vmin;
  max-height: calc(100vh - 50px);
}
</style>
