<template>
  <div class="column flex-center area-player">
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.p3"
        :key="index"
        :type="tile.name"
        position="top"
        size="large"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaTop",
});
import CompTile from "components/CompTile.vue";

import { useMjStore } from "src/stores/mj-store";

const userMj = useMjStore();
</script>
