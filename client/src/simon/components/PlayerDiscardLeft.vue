<template>
  <div class="column reverse-wrap items-start content-start full-height">
    <comp-tile
      v-for="(tile, index) in userMj.p1DiscardCards"
      :key="index"
      :type="tile"
      size="small"
      position="left"
    ></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardLeft",
});

import CompTile from "src/simon/components/CompTile.vue";

import { useMjStore } from "src/simon/stores/mj-store";

const userMj = useMjStore();
</script>
