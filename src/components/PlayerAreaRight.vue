<template>
  <div :class="['column flex-center area-player', userMj.currentPlayer !== 3 ? 'bg-blue' : 'bg-red']">
    <div class="row flex-center w-5">
      <comp-tile
        v-for="(tile, index) in userMj.p3Cards"
        :key="index"
        :type="tile"
        size="large"
        position="right"
        :selected="userMj.selectedCard.id == tile.id"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaRight",
});
import CompTile from "components/CompTile.vue";

import { useMjStore } from "src/stores/mj-store";

const userMj = useMjStore();
</script>
