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
      ></comp-tile>
      <q-btn v-if="userMj.current?.position === 0" flat @click="dropTile">Drop</q-btn>

      <q-btn v-if="userMj.current?.position !== Position.East" flat @click="passTurn">Pass</q-btn>
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
import { clientApi } from "src/client/client-api";
import { mjGame } from "src/core/mjGame";
import { Position } from "src/common/core/mj.game";

function onClick(tile: (typeof userMj.p4Cards)[0]) {
  if (userMj.selectedCard.id == tile.id) {
    userMj.selectedCard = { name: "", id: voidTileId, options: { selected: false } };
    return;
  }
  userMj.selectedCard = tile;
}

async function dropTile() {
  try {
    if (!userMj.p4Cards.some((tile) => tile.id === userMj.selectedCard.id)) {
      console.error("Selected tile is not in hand.");
      return;
    }

    const response = await clientApi.actionDrop(userMj.selectedCard.id);
    if (response) {
      mjGame.drop(userMj.selectedCard.id);
      userMj.refresh();
    } else {
      console.error("Drop failed: No game data in response");
    }
  } catch (error) {
    console.error("Error dropping tile:", error);
  }
}

async function passTurn() {
  try {
    if (!mjGame.current) {
      console.error("Error: No current player found, cannot pass.");
      return;
    }
    if (userMj.current?.position === Position.East) {
      console.error("You cannot pass your own turn!");
      return;
    }

    const response = await clientApi.actionPass();
    if (response) {
      mjGame.pass(mjGame.current);
      userMj.refresh();
    } else {
      console.error("Pass failed: No game data in response");
    }
  } catch (error) {
    console.error("Error passing:", error);
  }
}
const userMj = useMjStore();
</script>

<style></style>
