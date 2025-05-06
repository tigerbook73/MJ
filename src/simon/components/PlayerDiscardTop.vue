<template>
  <div class="row reverse reverse-wrap justify-start items-end content-start">
    <comp-tile
      v-for="(tile, index) in userMj.p2DiscardCards"
      :key="index"
      :type="tile"
      size="small"
      position="top"
    ></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardTop",
});
import CompTile from "src/simon/components/CompTile.vue";

import { useMjStore } from "src/simon/stores/mj-store";

const userMj = useMjStore();
</script>
