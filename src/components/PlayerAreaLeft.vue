<template>
  <div :class="['row flex-center area-player', userMj.currentPlayer !== 1 ? 'bg-blue' : 'bg-red']">
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
import { computed, ref } from "vue";
import { useMjStore } from "src/stores/mj-store";
import CompTile from "./CompTile.vue";

defineOptions({
  name: "PlayerAreaLeft",
});

import CompTile from "components/CompTile.vue";

import { useMjStore } from "src/stores/mj-store";

const userMj = useMjStore();
</script>

<style scoped>
.movearea {
  transition: 0.3s position ease;
  transition: 0.3s top ease;
}
</style>
