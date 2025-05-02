<template>
  <div class="column reverse-wrap items-start content-start full-height">
    <comp-tile
      v-for="(tile, index) in userMj.discardNorth"
      :key="index"
      :type="userMj.IDtoName(tile)"
      position="left"
      size="small"
    ></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardLeft",
});

import CompTile from "src/justin/components/CompTile.vue";

import { useMjStore } from "src/justin/stores/mj-store";

const userMj = useMjStore();
</script>
