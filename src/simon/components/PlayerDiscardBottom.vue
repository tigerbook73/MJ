<template>
  <div class="row">
    <comp-tile v-for="(tile, index) in userMj.p4DiscardCards" :key="index" :type="tile" size="small"></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardBottom",
});

import CompTile from "src/simon/components/CompTile.vue";

import { useMjStore } from "src/simon/stores/mj-store";

const userMj = useMjStore();
</script>
