<template>
  <div class="column flex-center area-player bg-green-0'">
    <div class="row reverse-wrap flex-center w-5">
      <comp-tile
        v-for="(tile, index) in mjStore.handTileRight"
        :key="index"
        :type="mjStore.IDtoName(tile)"
        :selected="tile === mjStore.selectedTile"
        position="right"
        size="large"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaRight",
});
import CompTile from "src/justin/components/CompTile.vue";
import { useMjStore } from "src/justin/stores/mj-store";

const mjStore = useMjStore();
</script>
