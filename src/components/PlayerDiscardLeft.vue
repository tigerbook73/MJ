<template>
  <div class="column reverse-wrap items-start content-start full-height">
    <comp-tile
      v-for="(tile, index) in userMj.p4_discard"
      :key="index"
      :type="tile"
      position="left"
      size="small"
    ></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardLeft",
});

import CompTile from "components/CompTile.vue";

import { useMjStore } from "src/stores/mj-store";

const userMj = useMjStore();
</script>
