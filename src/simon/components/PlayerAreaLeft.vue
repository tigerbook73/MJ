<template>
  <div :class="['row flex-center area-player', userMj.current?.position !== 1 ? 'bg-blue' : 'bg-red']">
    <div class="column flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.p1Cards"
        :key="index"
        :type="tile"
        size="large"
        position="left"
        :selected="userMj.selectedCard.id == tile.id"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMjStore } from "src/simon/stores/mj-store";
import CompTile from "./CompTile.vue";

defineOptions({
  name: "PlayerAreaLeft",
});

const userMj = useMjStore();
</script>

<style scoped>
.movearea {
  transition: 0.3s position ease;
  transition: 0.3s top ease;
}
</style>
