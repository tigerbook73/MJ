<template>
  <div class="column flex-center area-player bg-green-0">
    <div class="row reverse flex-center">
      <comp-tile
        v-for="(tile, index) in mjStore.handTileTop"
        :key="index"
        :type="mjStore.IDtoName(tile)"
        :selected="tile === mjStore.selectedTile"
        position="top"
        size="large"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
import CompTile from "src/justin/components/CompTile.vue";
import { useMjStore } from "src/justin/stores/mj-store";

defineOptions({
  name: "PlayerAreaTop",
});

const mjStore = useMjStore();
</script>
