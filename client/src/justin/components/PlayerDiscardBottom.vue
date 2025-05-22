<template>
  <div class="column flex-center area-player">
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in mjStore.discardBottom"
        :key="index"
        :type="mjStore.IDtoName(tile)"
        size="large"
      ></comp-tile>
    </div>
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
