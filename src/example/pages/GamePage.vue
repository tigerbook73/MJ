<template>
  <q-page class="fit row flex-center bg-green-2">
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

        <div class="w-18 column">
          <!-- top -->
          <div class="h-3 row">
            <div class="w-3"></div>
            <div class="w-18 column flex-center bg-blue-3">
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
            <div class="w-3 row flex-center bg-blue-3" style="height: 100%">
              <div class="column">
                <game-tile v-for="i in 18" :key="i" :tile="defaultLeftWall" style="line-height: 0.1"></game-tile>
              </div>
              <div class="column">
                <game-tile v-for="i in 18" :key="i" :tile="defaultLeftWall" style="line-height: 0.1"></game-tile>
              </div>
            </div>
            <div class="w-18 column"></div>
            <div class="w-3 row flex-center bg-blue-3">
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
            <div class="w-18 column flex-center bg-blue-3">
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
  </q-page>
</template>

<script setup lang="ts">
import { TileCore } from "src/common/core/mj.tile-core";
import GameTile, { GameTileProp } from "../components/GameTile.vue";

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

<style scoped lang="scss">
.square {
  aspect-ratio: 1 / 1;
  width: 100%;
  max-width: 100vmin;
  max-height: calc(100vh - 50px);
}

@for $i from 1 through 24 {
  .w-#{$i} {
    width: calc($i / 24) * 100%;
    height: 100%;
  }
}

@for $i from 1 through 24 {
  .h-#{$i} {
    height: calc($i / 24) * 100%;
    width: 100%;
  }
}
</style>
