<template>
  <div
    :class="[
      'column flex-center area-player',
      userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Bottom) ? 'bg-blue' : 'bg-red',
    ]"
  >
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.pBottomCards"
        :key="index"
        :type="tile"
        size="large"
        :selected="selectedTiles.includes(tile.id)"
        @click="onClick(tile)"
        @dblclick="dropTile(tile.id)"
      ></comp-tile>

      <q-btn
        v-if="userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Bottom)"
        flat
        @click="passTurn()"
        >Pass</q-btn
      >
      <q-btn
        v-if="userMj.current?.position === mapPosition(roomStore().currentPosition!, Direction.Left)"
        flat
        @click="handleChi()"
        :disable="selectedTiles.length < 2"
        >Chi</q-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PlayerAreaBottom" });

import CompTile from "src/simon/components/CompTile.vue";

import { Direction, mapPosition, useMjStore } from "src/simon/stores/mj-store";
// import { wait } from "src/utils/timer";

// async function onClick(tile: string) {
//   if (userMj.mySelected.includes(tile)) {
//     userMj.mySelected = [];
//     return;
//   }

//   await wait(1000);
//   userMj.mySelected = [tile];
//   await wait(1000);
//   userMj.mySelected = [];
//   await wait(1000);
//   userMj.mySelected = [tile];

//   /**
//    * steps:
//    *
//    * 1. store.picked = picked
//    * 2. wait(500)
//    * 3. sorthand()
//    * 4. wait(500)
//    * 5. selected = discard()
//    * 6. wait(500)
//    * 7. selected = []
//    * 8.
//    */
// }

import type { TileId } from "@common/core/mj.tile-core";
// import { TileCore } from "@common/core/mj.tile-core";
import { roomStore } from "../stores/room-store";
import { ref } from "vue";
let lastClickTime = 0;
function onClick(tile: (typeof userMj.pBottomCards)[0]) {
  const now = Date.now();
  if (now - lastClickTime < 500) {
    dropTile();
    lastClickTime = 0; // Reset last click time after double click
    return;
  }
  lastClickTime = now;
  // if (userMj.selectedCard.id == tile.id) {
  //   userMj.selectedCard = { name: "", id: TileCore.voidId, options: { selected: false } };
  //   return;
  // }
  // userMj.selectedCard = tile;

  // if (!selectedTiles.value.includes(tile.id)) {
  //   if (selectedTiles.value.length < 2) {
  //     selectedTiles.value.push(tile.id);
  //   } else {
  //     selectedTiles.value.shift();
  //     selectedTiles.value.push(tile.id);
  //   }
  // }

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
function handleChi() {
  const tile1 = selectedTiles.value[0];
  const tile2 = selectedTiles.value[1];
  emits("handle-chi", [tile1, tile2]);
  selectedTiles.value = [];
}
const userMj = useMjStore();
</script>

<style></style>
