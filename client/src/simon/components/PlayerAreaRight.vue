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
      <comp-tile v-for="(tile, index) in rightCardsVisible" :key="index" :type="tile"
        :back="!shouldRevealRight && isReal(tile.id)" size="large" position="right"
        :selected="userMj.selectedCard.id == tile.id"></comp-tile>

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
import { GameState } from "src/common/core/mj.game";

const userMj = useMjStore();
const room = roomStore();


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

const isRightCurrent = computed(() => userMj.currentGame?.current?.position === targetSeat.value);

// 是否需要亮牌（只亮左家自己、或者你有个全局“明牌开关”时也可亮）
const shouldRevealRight = computed(() => {
  // 仅胡的人亮
  // return hasHuRight.value;
  // 如果“局已结束时”亮全员，可改为：
  return isRightCurrent.value && (userMj.currentGame?.state === GameState.End);
});

const isReal = (id: number) => id !== TileCore.voidId && id !== -1;

// 别再 filter 占位牌，直接返回完整数组
const rightCardsVisible = computed(() => userMj.p3Cards);
</script>
