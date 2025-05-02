<template>
  <div class="column reverse wrap justify-start items-end content-start area-player">
    <comp-tile
      v-for="(tile, index) in userMj.p3DiscardCards"
      :key="index"
      :type="tile"
      size="small"
      position="right"
    ></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardRight",
});

import CompTile from "components/CompTile.vue";

import { useMjStore } from "src/simon/stores/mj-store";

const userMj = useMjStore();
</script>
