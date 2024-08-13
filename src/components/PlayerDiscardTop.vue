<template>
  <div class="row reverse reverse-wrap items-start content-start full-height">
    <comp-tile
      v-for="(tile, index) in userMj.p3_discard"
      :key="index"
      :type="tile"
      position="top"
      size="small"
    ></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardTop",
});

import CompTile from "components/CompTile.vue";

import { useMjStore } from "src/stores/mj-store";

const userMj = useMjStore();
</script>
