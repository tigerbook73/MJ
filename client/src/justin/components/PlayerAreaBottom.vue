<template>
  <div :class="['column flex-center area-player', 'bg-green-0']">
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in mjStore.handTileBottom"
        :key="index"
        :type="mjStore.IDtoName(tile)"
        :selected="tile === mjStore.selectedTile"
        @click="onClick(tile)"
        position="bottom"
        size="large"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaBottom",
});

import CompTile from "src/justin/components/CompTile.vue";
import { TileCore } from "@common/core/mj.tile-core";
import { useMjStore } from "src/justin/stores/mj-store";

const mjStore = useMjStore();

function onClick(tile: number) {
  //
  if (mjStore.selectedTile != tile) {
    mjStore.selectedTile = tile;
  } else {
    mjStore.selectedTile = TileCore.voidTile.id;
  }
}
</script>
