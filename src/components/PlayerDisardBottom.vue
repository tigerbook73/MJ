<template>
  <div class="column flex-center area-player">
    <!-- <div class="row justify-between items-start">
      <comp-tile v-for="(tile, index) in userMj.myTiles" :key="index" :type="tile" size="large"></comp-tile>
    </div> -->
    <div class="row flex-center">
      <comp-tile v-for="(tile, index) in userMj.myTiles" :key="index" :type="tile" size="large"></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardBottom",
});

import CompTile from "components/CompTile.vue";

import { useMjStore } from "src/stores/mj-store";

const userMj = useMjStore();
</script>
