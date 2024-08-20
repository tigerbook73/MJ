<template>
  <div class="row">
    <comp-tile v-for="(tile, index) in userMj.myDiscardCards" :key="index" :type="tile" size="small"></comp-tile>
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
