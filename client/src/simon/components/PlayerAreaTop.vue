<template>
  <div
    :class="[
      'row reverse flex-center justify-around area-player',
      userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Top) ? 'bg-blue' : 'bg-red',
    ]"
  >
    <div class="row reverse items-center justify-start">
      <div v-for="(group, gIdx) in meldGroups" :key="gIdx" class="row q-mr-lg">
        <comp-tile v-for="(tile, idx) in group" :key="idx" :type="tile" size="small" position="top" />
      </div>
    </div>

    <div class="row reverse flex-center">
      <comp-tile
        v-for="(tile, index) in topCardsVisible"
        :key="index"
        :type="tile"
        :back="!shouldRevealTop && isReal(tile.id)"
        position="top"
        :selected="userMj.selectedCard.id == tile.id"
      ></comp-tile>
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
import { ActionType, TileCore, GameState } from "@mj/shared";

const userMj = useMjStore();
const room = roomStore();

const mySeat = computed(() => room.currentPosition);
const targetSeat = computed(() => (mySeat.value != null ? mapPosition(mySeat.value, Direction.Top) : null));

const playerTop = computed(() =>
  targetSeat.value != null ? userMj.currentGame?.players.find((p) => p?.position === targetSeat.value) : undefined,
);

const meldGroups = computed(() => {
  if (!playerTop.value) return [];
  return playerTop.value.openedSets
    .filter(
      (s) =>
        s.actionType === ActionType.Chi ||
        s.actionType === ActionType.Peng ||
        s.actionType === ActionType.Gang ||
        s.actionType === ActionType.Hu,
    )
    .map((s) =>
      s.tiles.map((id) => {
        const t = TileCore.fromId(id);
        return { name: t.name, id: t.id, options: { selected: false } } as HandCard;
      }),
    );
});

const isTopCurrent = computed(() => userMj.currentGame?.current?.position === targetSeat.value);

// 是否需要亮牌（只亮左家自己、或者你有个全局“明牌开关”时也可亮）
const shouldRevealTop = computed(() => {
  // 仅胡的人亮
  // return hasHuTop.value;
  // 如果“局已结束时”亮全员，可改为：
  return isTopCurrent.value && userMj.currentGame?.state === GameState.End;
});

const isReal = (id: number) => id !== TileCore.voidId && id !== -1;

// 别再 filter 占位牌，直接返回完整数组
const topCardsVisible = computed(() => userMj.p2Cards);
</script>
