<template>
  <div :class="[
    'column flex-center area-player',
    userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Bottom) ? 'bg-blue' : 'bg-red',
  ]">
    <div class="row flex-center q-gutter-xs">
      <div v-for="(group, gIdx) in eatTiles" :key="gIdx" class="row">
        <comp-tile v-for="(tile, index) in group" :key="gIdx + index" :type="tile" size="small" />
      </div>
    </div>

    <div class="row flex-center">
      <comp-tile v-for="(tile, index) in userMj.pBottomCards" :key="index" :type="tile" size="large"
        :selected="selectedTiles.includes(tile.id)" @click="onClick(tile)" @dblclick="dropTile(tile.id)"></comp-tile>

      <q-btn v-if="userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Bottom)" flat
        @click="passTurn()">Pass</q-btn>
      <q-btn v-if="canChi.show" flat @click="handleChi()" :disable="canChi.disabled">Chi</q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PlayerAreaBottom" });

import CompTile from "src/simon/components/CompTile.vue";

import type { HandCard } from "src/simon/stores/mj-store";
import { Direction, mapPosition, useMjStore } from "src/simon/stores/mj-store";
import { TileCore, type TileId } from "@common/core/mj.tile-core";
// import { TileCore } from "@common/core/mj.tile-core";
import { roomStore } from "../stores/room-store";
import { computed, ref } from "vue";
import { ActionType } from "src/common/core/mj.game";
const room = roomStore();
let lastClickTime = 0;
const currentPosition = computed(() => userMj.current?.position);
const myPosition = computed(() => room.currentPosition);
const leftPosition = computed(() => mapPosition(myPosition.value!, Direction.Left));

const canChi = computed(() => {
  // 当前出牌者是上家，且自己是Bottom
  console.log('userMj.latestTile', userMj.latestTile);
  const isFromLeft = currentPosition.value === leftPosition.value;
  // const isBottom = myPosition.value === mapPosition(currentPosition.value!, Direction.Bottom);
  // 获取上家打出的牌
  const latestTile = userMj.latestTile;
  if (!isFromLeft) {
    return { show: false, disabled: false };
  }

  const chi = TileCore.canChi(userMj.pBottomCards.map(card => card.id), latestTile!);

  return {
    show: chi,
    disabled:
      selectedTiles.value.length !== 2 ||
      !TileCore.isConsecutive(selectedTiles.value[0], selectedTiles.value[1], latestTile!),
  };

});

function onClick(tile: (typeof userMj.pBottomCards)[0]) {
  const now = Date.now();
  if (now - lastClickTime < 500) {
    dropTile();
    lastClickTime = 0; // Reset last click time after double click
    return;
  }
  lastClickTime = now;
  const idx = selectedTiles.value.indexOf(tile.id);
  if (idx !== -1) {
    // if the tile is already selected, remove it
    selectedTiles.value.splice(idx, 1);
  } else {
    if (selectedTiles.value.length < 2) {
      selectedTiles.value.push(tile.id);
    } else {
      selectedTiles.value.shift();
      selectedTiles.value.push(tile.id);
    }
  }
}

const emits = defineEmits<{
  (e: "drop-tile", payload: TileId): void;
  (e: "pass-turn"): void;
  (e: "handle-chi", payload: [tile1: TileId, tile2: TileId]): void;
}>();

function dropTile(tileId?: TileId) {
  if (tileId) {
    emits("drop-tile", tileId);
  }
  selectedTiles.value = [];
}

function passTurn() {
  emits("pass-turn");
}

const selectedTiles = ref<TileId[]>([]);
const eatTiles = ref<HandCard[][]>([]);

const player = useMjStore().current;
if (player) {
  eatTiles.value = player.openedSets
    .filter((set) => set.actionType === ActionType.Chi)
    .map((set): HandCard[] =>
      set.tiles.map((tileId) => {
        const tile = TileCore.fromId(tileId);
        return {
          name: tile.name,
          id: tile.id,
          options: { selected: selectedTiles.value.includes(tileId) },
        };
      }),
    );
}
function handleChi() {
  const tile1 = selectedTiles.value[0];
  const tile2 = selectedTiles.value[1];
  emits("handle-chi", [tile1, tile2]);
  selectedTiles.value = [];
}
const userMj = useMjStore();
</script>

<style></style>
