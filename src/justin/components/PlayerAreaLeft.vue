<template>
  <div
    :class="[
      'column flex-center area-player',
      userMj.isCurrentPlayer((userMj.my_pos + 3) % 4) ? 'bg-green-4' : 'bg-green-0',
    ]"
  >
    <div class="row flex-center w-5">
      <comp-tile
        v-for="(tile, index) in userMj.players[3].handTiles"
        :key="index"
        :type="userMj.IDtoName(tile)"
        :selected="tile === userMj.selectedTile"
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

const userMj = useMjStore();
</script>

<style scoped>
.movearea {
  transition: 0.3s position ease;
  transition: 0.3s top ease;
}
</style>
