<template>
  <div :class="[
    'column reverse flex-center area-player',
    userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Top) ? 'bg-blue' : 'bg-red',
  ]">
    <div class="row reverse flex-center">
      <comp-tile v-for="(tile, index) in topCardsVisible" :key="index" :type="tile" :back="!userMj.open" size="large"
        position="top" :selected="userMj.selectedCard.id == tile.id"></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Direction, mapPosition, useMjStore } from "src/simon/stores/mj-store";

defineOptions({ name: "PlayerAreaTop" });
import CompTile from "src/simon/components/CompTile.vue";
import { roomStore } from "../stores/room-store";
import { computed } from "vue";
import { TileCore } from "src/common/core/mj.tile-core";

const userMj = useMjStore();

const topCardsVisible = computed(() => {
  // 明牌开 -> 原数组；关 -> 过滤掉占位
  return userMj.open
    ? userMj.p2Cards
    : userMj.p2Cards.filter(c => c.id !== TileCore.voidId && c.id !== -1);
});
</script>
