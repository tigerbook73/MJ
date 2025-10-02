<template>
  <div :class="[
    'row reverse flex-center justify-around area-player',
    userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Top) ? 'bg-blue' : 'bg-red',
  ]">
    <div class="row reverse items-center justify-start">
      <div v-for="(group, gIdx) in meldGroups" :key="gIdx" class="row q-mr-lg">
        <comp-tile v-for="(tile, idx) in group" :key="idx" :type="tile" size="small" position="top" />
      </div>
    </div>

    <div class="row reverse flex-center">
      <comp-tile v-for="(tile, index) in topCardsVisible" :key="index" :type="tile" :back="!userMj.open" size="large"
        position="top" :selected="userMj.selectedCard.id == tile.id"></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HandCard } from "src/simon/stores/mj-store";
import { Direction, mapPosition, useMjStore } from "src/simon/stores/mj-store";

defineOptions({ name: "PlayerAreaTop" });
import CompTile from "src/simon/components/CompTile.vue";
import { roomStore } from "../stores/room-store";
import { computed } from "vue";
import { ActionType, TileCore } from "src/common/core/mj.tile-core";

const userMj = useMjStore();
const room = roomStore();
const topCardsVisible = computed(() => {
  // 明牌开 -> 原数组；关 -> 过滤掉占位
  return userMj.open
    ? userMj.p2Cards
    : userMj.p2Cards.filter(c => c.id !== TileCore.voidId && c.id !== -1);
});

const mySeat = computed(() => room.currentPosition);
const targetSeat = computed(() =>
  mySeat.value != null ? mapPosition(mySeat.value, Direction.Top) : null
);

const playerTop = computed(() =>
  targetSeat.value != null
    ? userMj.currentGame?.players.find(p => p?.position === targetSeat.value)
    : undefined
);

const meldGroups = computed(() => {
  if (!playerTop.value) return [];
  return playerTop.value.openedSets
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
