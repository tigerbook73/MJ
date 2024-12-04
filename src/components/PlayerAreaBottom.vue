<template>
  <div :class="['column flex-center area-player', userMj.currentPlayer !== 0 ? 'bg-blue' : 'bg-red']">
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.myCards"
        :key="index"
        :type="tile"
        size="large"
        :selected="userMj.selectedCard.id == tile.id"
        @click="onClick(tile)"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaBottom",
});

import CompTile from "components/CompTile.vue";

import { useMjStore } from "src/stores/mj-store";
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

import { voidTileId } from "src/core/mjCard";

function onClick(tile: (typeof userMj.myCards)[0]) {
  if (userMj.selectedCard.id == tile.id) {
    userMj.selectedCard = { name: "", id: voidTileId, options: { selected: false } };
    return;
  }
  userMj.selectedCard = tile;
}
const userMj = useMjStore();
</script>

<style></style>
