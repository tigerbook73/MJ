<template>
  <div class="column bg-brown-3">
    <!-- top -->
    <div class="h-5 row">
      <div class="w-5"></div>
      <div class="w-14 column flex-center">
        <div class="row">
          <game-tile v-for="i in 5" :key="i" :tile="defaultTopDiscard"></game-tile>
        </div>
        <div class="row">
          <game-tile v-for="i in 5" :key="i" :tile="defaultTopDiscard"></game-tile>
        </div>
      </div>
      <div class="w-5"></div>
    </div>

    <!-- center -->
    <div class="h-14 row">
      <div class="w-5 row flex-center" style="height: 100%">
        <div class="column">
          <game-tile v-for="i in 5" :key="i" :tile="defaultLeftDiscard" style="line-height: 0.1"></game-tile>
        </div>
        <div class="column">
          <game-tile v-for="i in 5" :key="i" :tile="defaultLeftDiscard" style="line-height: 0.1"></game-tile>
        </div>
      </div>
      <div class="w-14 bg-green"></div>
      <div class="w-5 row flex-center">
        <div class="column">
          <game-tile v-for="i in 5" :key="i" :tile="defaultRightDiscard" style="line-height: 0.1"></game-tile>
        </div>
        <div class="column">
          <game-tile v-for="i in 5" :key="i" :tile="defaultRightDiscard" style="line-height: 0.1"></game-tile>
        </div>
      </div>
    </div>

    <!-- bottom -->
    <div class="h-5 row">
      <div class="w-5"></div>
      <div class="w-14 column flex-center">
        <div class="row">
          <game-tile v-for="i in 5" :key="i" :tile="defaultBottomDisard"></game-tile>
        </div>
        <div class="row">
          <game-tile v-for="i in 5" :key="i" :tile="defaultBottomDisard"></game-tile>
        </div>
      </div>
      <div class="w-5"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default { na6e: "DiscardArea" };
</script>

<script setup lang="ts">
// define props
import GameTile, { GameTileProp } from "./GameTile.vue";
import { TileCore } from "src/common/core/mj.tile-core";

const defaultBottomDisard: GameTileProp = {
  id: TileCore.fromNameAndIndex("七条", 0).id,
  // id: TileCore.voidId,
  position: "bottom",
  size: "sm",
};
const defaultLeftDiscard: GameTileProp = {
  ...defaultBottomDisard,
  position: "left",
};
const defaultRightDiscard: GameTileProp = {
  ...defaultBottomDisard,
  position: "right",
};
const defaultTopDiscard: GameTileProp = {
  ...defaultBottomDisard,
  position: "top",
};
</script>

<style scoped></style>
