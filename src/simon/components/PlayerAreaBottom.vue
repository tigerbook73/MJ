<template>
  <div :class="['column flex-center area-player', userMj.current?.position !== 0 ? 'bg-blue' : 'bg-red']">
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.p4Cards"
        :key="index"
        :type="tile"
        size="large"
        :selected="userMj.selectedCard.id == tile.id"
        @click="onClick(tile)"
        @dblclick="dropTile()"
      ></comp-tile>

      <q-btn v-if="userMj.current?.position !== Position.East" flat @click="passTurn">Pass</q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaBottom",
});

import CompTile from "src/simon/components/CompTile.vue";

import { useMjStore } from "src/simon/stores/mj-store";
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

import { Position } from "src/common/core/mj.game";
import { TileCore } from "src/common/core/mj.tile-core";

function onClick(tile: (typeof userMj.p4Cards)[0]) {
  if (userMj.selectedCard.id == tile.id) {
    userMj.selectedCard = { name: "", id: TileCore.voidId, options: { selected: false } };
    return;
  }
  userMj.selectedCard = tile;
}

const emits = defineEmits<{
  (e: "drop-tile"): void;
  (e: "pass-turn"): void;
}>();

async function dropTile() {
  emits("drop-tile");
}

async function passTurn() {
  emits("pass-turn");
}
const userMj = useMjStore();
</script>

<style></style>
