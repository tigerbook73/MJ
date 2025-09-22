<template>
  <div class="column reverse-wrap items-start content-start full-height">
    <comp-tile v-for="(tile, index) in filteredDiscardCards" :key="index" :type="tile" size="small"
      position="left"></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardLeft",
});

import CompTile from "src/simon/components/CompTile.vue";
import { useMjStore } from "../stores/mj-store";
import { computed } from "vue";
const userMj = useMjStore();

// 计算过滤后的弃牌堆
const filteredDiscardCards = computed(() => {
  return userMj.p1DiscardCards.filter((tile) => !userMj.eatenTiles.includes(tile.id));
});
</script>
