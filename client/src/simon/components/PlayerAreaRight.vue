<template>
  <div :class="[
    'row reverse flex-center area-player',
    userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Right) ? 'bg-blue' : 'bg-red',
  ]">
    <div class="column reverse flex-center">
      <comp-tile v-for="(tile, index) in rightCardsVisible" :key="index" :type="tile" :back="!userMj.open" size="large"
        position="right" :selected="userMj.selectedCard.id == tile.id"></comp-tile>

    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PlayerAreaRight" });
import CompTile from "src/simon/components/CompTile.vue";

import { Direction, mapPosition, useMjStore } from "src/simon/stores/mj-store";
import { roomStore } from "../stores/room-store";
import { computed } from "vue";
import { TileCore } from "src/common/core/mj.tile-core";

const userMj = useMjStore();

const rightCardsVisible = computed(() => {
  // 明牌开 -> 原数组；关 -> 过滤掉占位
  return userMj.open
    ? userMj.p3Cards
    : userMj.p3Cards.filter(c => c.id !== TileCore.voidId && c.id !== -1);
});
</script>
