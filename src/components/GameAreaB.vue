<template>
  <div>
    <q-btn flat @click="reset">reset</q-btn>
    <q-btn flat @click="shuffle">shuffle</q-btn>
    <!-- <q-btn flat @click="getTile">get tile</q-btn> -->
  </div>
</template>

<script setup lang="ts">
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "GameAreaB",
});

const mjStore = useMjStore();

function reset() {
  //
  mjGame.init();
  mjGame.separate();
  mjStore.refresh();
}

function shuffle() {
  //
  mjGame.init();
  mjGame.shuffle();
  // mjGame.separate();
  mjStore.refresh();
}

// function getTile() {
//   //
//   mjStore.myTiles.values
// }
</script>
