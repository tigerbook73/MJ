<template>
  <div class="column flex-center area-player">
    <div class="row flex-center">
      <comp-tile v-for="(tile, index) in userMj.p1_discard" :key="index" :type="tile" size="small"></comp-tile>
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
