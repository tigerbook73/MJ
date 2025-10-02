<template>
  <div :class="[
    'column reverse flex-center justify-around area-player',
    userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Right) ? 'bg-blue' : 'bg-red',
  ]">
    <div class="column reverse items-center justify-start">
      <div v-for="(group, gIdx) in meldGroups" :key="gIdx" class="meld q-mr-lg">
        <comp-tile v-for="(tile, idx) in group" :key="idx" :type="tile" size="small" position="right" />
      </div>
    </div>

    <div class="column reverse flex-center">
      <comp-tile v-for="(tile, index) in rightCardsVisible" :key="index" :type="tile" :back="!userMj.open" size="large"
        position="right" :selected="userMj.selectedCard.id == tile.id"></comp-tile>

    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PlayerAreaRight" });
import CompTile from "src/simon/components/CompTile.vue";

import type { HandCard } from "src/simon/stores/mj-store";
import { Direction, mapPosition, useMjStore } from "src/simon/stores/mj-store";
import { roomStore } from "../stores/room-store";
import { computed } from "vue";
import { ActionType, TileCore } from "src/common/core/mj.tile-core";

const userMj = useMjStore();
const room = roomStore();
const rightCardsVisible = computed(() => {
  // 明牌开 -> 原数组；关 -> 过滤掉占位
  return userMj.open
    ? userMj.p3Cards
    : userMj.p3Cards.filter(c => c.id !== TileCore.voidId && c.id !== -1);
});

// 我的座位（Bottom 的基准）
const mySeat = computed(() => room.currentPosition);


// PlayerAreaRight.vue
const targetSeat = computed(() =>
  mySeat.value != null ? mapPosition(mySeat.value, Direction.Right) : null
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
