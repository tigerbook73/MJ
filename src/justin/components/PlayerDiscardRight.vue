<template>
  <div class="column reverse wrap items-start content-start full-height">
    <comp-tile
      v-for="(tile, index) in mjStore.discardRight"
      :key="index"
      :type="mjStore.IDtoName(tile)"
      position="right"
      size="small"
    ></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardRight",
});

import CompTile from "src/justin/components/CompTile.vue";
import { useMjStore } from "src/justin/stores/mj-store";

const mjStore = useMjStore();
</script>
