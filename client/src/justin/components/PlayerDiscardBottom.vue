<template>
  <div class="row items-start content-start full-height">
    <comp-tile
      v-for="(tile, index) in mjStore.discardBottom"
      :key="index"
      :type="mjStore.IDtoName(tile)"
      position="bottom"
      size="small"
    ></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardBottom",
});

import CompTile from "src/justin/components/CompTile.vue";

import { useMjStore } from "src/justin/stores/mj-store";

const mjStore = useMjStore();
</script>
