<template>
  <div>
    <!-- <q-btn flat @click="reset">reset</q-btn> -->
    <center><q-btn flat @click="start">start</q-btn></center>
    <center>{{ checkStatus() }}</center>
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

// function reset() {

//   mjGame.init();
//   mjGame.separate();
//   mjStore.refresh();
// }

function checkStatus() {
  if (mjGame.status == "ready") {
    return "Started";
  }
  return "Ready";
}

function start() {
  //
  mjGame.init();
  mjGame.shuffle();
  mjGame.start();
  mjStore.refresh();
}

// function getTile() {
//   //
//   mjStore.myTiles.values
// }
</script>
