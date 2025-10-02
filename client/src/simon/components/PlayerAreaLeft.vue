<template>
  <div :class="[
    'column flex-center justify-around area-player',
    userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Left) ? 'bg-blue' : 'bg-red',
  ]">
    <div class="column items-center justify-start">
      <div v-for="(group, gIdx) in meldGroups" :key="gIdx" class="meld q-mr-lg">
        <comp-tile v-for="(tile, idx) in group" :key="idx" :type="tile" size="small" position="left" />
      </div>
    </div>


    <div class="column flex-center">
      <comp-tile v-for="(tile, index) in leftCardsVisible" :key="index" :type="tile" :back="!userMj.open" size="large"
        position="left" :selected="userMj.selectedCard.id == tile.id"></comp-tile>
    </div>
  </div>

</template>

<script setup lang="ts">
import type { HandCard } from "src/simon/stores/mj-store";
import { Direction, mapPosition, useMjStore } from "src/simon/stores/mj-store";
import CompTile from "./CompTile.vue";
import { roomStore } from "../stores/room-store";
import { computed } from "vue";
import { ActionType, TileCore } from "src/common/core/mj.tile-core";

defineOptions({ name: "PlayerAreaLeft" });

const userMj = useMjStore();
const room = roomStore();
const leftCardsVisible = computed(() => {
  // 明牌开 -> 原数组；关 -> 过滤掉占位
  return userMj.open
    ? userMj.p1Cards
    : userMj.p1Cards.filter(c => c.id !== TileCore.voidId && c.id !== -1);
});

// 我的座位（Bottom 的基准）
const mySeat = computed(() => room.currentPosition);

// 这个组件代表“我的左家”的绝对座位号
const targetSeat = computed(() =>
  mySeat.value != null ? mapPosition(mySeat.value, Direction.Left) : null
);

// 左家的玩家对象
const playerLeft = computed(() =>
  targetSeat.value != null
    ? userMj.currentGame?.players.find(p => p?.position === targetSeat.value)
    : undefined
);

// 左家的副露（吃/碰/杠）
const meldGroups = computed(() => {
  if (!playerLeft.value) return [];
  return playerLeft.value.openedSets
    .filter(s =>
      s.actionType === ActionType.Chi ||
      s.actionType === ActionType.Peng ||
      s.actionType === ActionType.Gang ||
      s.actionType === ActionType.Hu
    )
    .map(s =>
      s.tiles.map(id => {
        const t = TileCore.fromId(id);
        return { name: t.name, id: t.id, options: { selected: false } } as HandCard;
      })
    );
});
</script>

<style scoped>
.movearea {
  transition: 0.3s position ease;
  transition: 0.3s top ease;
}
</style>
