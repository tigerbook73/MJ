<template>
  <div :class="[
    'row flex-center area-player',
    userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Left) ? 'bg-blue' : 'bg-red',
  ]">
    <div class="column flex-center">
      <comp-tile v-for="(tile, index) in leftCardsVisible" :key="index" :type="tile" :back="!userMj.open" size="large"
        position="left" :selected="userMj.selectedCard.id == tile.id"></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Direction, mapPosition, useMjStore } from "src/simon/stores/mj-store";
import CompTile from "./CompTile.vue";
import { roomStore } from "../stores/room-store";
import { computed } from "vue";
import { TileCore } from "src/common/core/mj.tile-core";

defineOptions({ name: "PlayerAreaLeft" });

const userMj = useMjStore();

const leftCardsVisible = computed(() => {
  // 明牌开 -> 原数组；关 -> 过滤掉占位
  return userMj.open
    ? userMj.p1Cards
    : userMj.p1Cards.filter(c => c.id !== TileCore.voidId && c.id !== -1);
});
</script>

<style scoped>
.movearea {
  transition: 0.3s position ease;
  transition: 0.3s top ease;
}
</style>
