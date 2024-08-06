<template>
  <div :class="['column flex-center area-player', userMj.isCurrentPlayer(0) ? 'bg-green-4' : 'bg-green-0']">
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.p1"
        :key="index"
        :type="tile"
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

import CompTile from "components/CompTile.vue";
import { useMjStore } from "src/stores/mj-store";

const userMj = useMjStore();
</script>
