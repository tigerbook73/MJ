<template>
  <div class="column bg-blue-3">
    <!-- top -->
    <div class="h-3 row">
      <div class="w-3"></div>
      <div class="w-18 column flex-center">
        <div class="row">
          <game-tile v-for="i in 18" :key="i" :tile="defaultTopWall"></game-tile>
        </div>
        <div class="row">
          <game-tile v-for="i in 18" :key="i" :tile="defaultTopWall"></game-tile>
        </div>
      </div>
      <div class="w-3"></div>
    </div>

    <!-- center -->
    <div class="h-18 row">
      <div class="w-3 row flex-center" style="height: 100%">
        <div class="column">
          <game-tile v-for="i in 18" :key="i" :tile="defaultLeftWall" style="line-height: 0.1"></game-tile>
        </div>
        <div class="column">
          <game-tile v-for="i in 18" :key="i" :tile="defaultLeftWall" style="line-height: 0.1"></game-tile>
        </div>
      </div>
      <discard-area class="w-18" />
      <div class="w-3 row flex-center">
        <div class="column">
          <game-tile v-for="i in 18" :key="i" :tile="defaultRightWall" style="line-height: 0.1"></game-tile>
        </div>
        <div class="column">
          <game-tile v-for="i in 18" :key="i" :tile="defaultRightWall" style="line-height: 0.1"></game-tile>
        </div>
      </div>
    </div>

    <!-- bottom -->
    <div class="h-3 row">
      <div class="w-3"></div>
      <div class="w-18 column flex-center">
        <div class="row">
          <game-tile v-for="i in 18" :key="i" :tile="defaultBottomWall"></game-tile>
        </div>
        <div class="row">
          <game-tile v-for="i in 18" :key="i" :tile="defaultBottomWall"></game-tile>
        </div>
      </div>
      <div class="w-3"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "WallArea" };
</script>

<script setup lang="ts">
// define props
import DiscardArea from "./DiscardArea.vue";
import GameTile, { GameTileProp } from "./GameTile.vue";
import { TileCore } from "src/common/core/mj.tile-core";

GameTile;
const defaultBottomWall: GameTileProp = {
  id: TileCore.fromNameAndIndex("八万", 0).id,
  // id: TileCore.voidId,
  position: "bottom",
  size: "xs",
  back: true,
};
const defaultLeftWall: GameTileProp = {
  ...defaultBottomWall,
  position: "left",
  back: true,
};
const defaultRightWall: GameTileProp = {
  ...defaultBottomWall,
  position: "right",
  back: true,
};
const defaultTopWall: GameTileProp = {
  ...defaultBottomWall,
  position: "top",
  back: true,
};
</script>

<style scoped></style>
