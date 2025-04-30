<template>
  <q-page class="fit row flex-center bg-green-2">
    <div class="column square bg-purple-1">
      <!-- square content here -->
      <!-- top -->
      <div class="h-3 row">
        <div class="w-3"></div>
        <div class="w-18 row flex-center bg-green-1">
          <game-tile v-for="i in 3" :key="i" :tile="defaultTopTile"></game-tile>
        </div>
        <div class="w-3"></div>
      </div>

      <!-- center -->
      <div class="h-18 row">
        <div class="w-3 column flex-center bg-green-1">
          <game-tile v-for="i in 3" :key="i" :tile="defaultLeftTile"></game-tile>
        </div>
        <div class="w-18 row flex-center">center-center</div>
        <div class="w-3 column flex-center bg-green-1">
          <game-tile v-for="i in 3" :key="i" :tile="defaultRightTile"></game-tile>
        </div>
      </div>

      <!-- bottom -->
      <div class="h-3 row">
        <div class="w-3"></div>
        <div class="w-18 row flex-center bg-green-1">
          <game-tile v-for="i in 3" :key="i" :tile="defaultBottomTile"></game-tile>
        </div>
        <div class="w-3"></div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { TileCore } from "src/common/core/mj.tile-core";
import GameTile, { GameTileProp } from "../components/GameTile.vue";

const defaultBottomTile: GameTileProp = {
  id: TileCore.fromNameAndIndex("八万", 0).id,
  // id: TileCore.voidId,
  position: "bottom",
  back: false,
};
const defaultLeftTile: GameTileProp = {
  ...defaultBottomTile,
  position: "left",
  back: true,
};
const defaultRightTile: GameTileProp = {
  ...defaultBottomTile,
  position: "right",
  back: true,
};
const defaultTopTile: GameTileProp = {
  ...defaultBottomTile,
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
  }
}

@for $i from 1 through 24 {
  .h-#{$i} {
    height: calc($i / 24) * 100%;
  }
}
</style>
