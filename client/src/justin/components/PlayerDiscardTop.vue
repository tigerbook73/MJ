<template>
  <div class="row reverse reverse-wrap items-start content-start full-height">
    <comp-tile
      v-for="(tile, index) in mjStore.discardTop"
      :key="index"
      :type="mjStore.IDtoName(tile)"
      position="top"
      size="small"
    ></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardTop",
});

import CompTile from "src/justin/components/CompTile.vue";

import { useMjStore } from "src/justin/stores/mj-store";

const mjStore = useMjStore();
</script>
