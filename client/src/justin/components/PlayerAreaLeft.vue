<template>
  <div :class="['column flex-center area-player', 'bg-green-0']">
    <div class="row flex-center w-5">
      <comp-tile
        v-for="(tile, index) in mjStore.handTileLeft"
        :key="index"
        :type="mjStore.IDtoName(tile)"
        :selected="tile === mjStore.selectedTile"
        position="left"
        size="large"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMjStore } from "src/justin/stores/mj-store";
import CompTile from "./CompTile.vue";

defineOptions({
  name: "PlayerAreaLeft",
});

const mjStore = useMjStore();
</script>

<style scoped>
.movearea {
  transition: 0.3s position ease;
  transition: 0.3s top ease;
}
</style>
