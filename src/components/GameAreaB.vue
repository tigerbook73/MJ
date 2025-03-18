<template>
  <div class="area-board">
    <!-- {{ $options.name }} -->
    <q-btn flat @click="start">start</q-btn>
    <q-btn flat @click="reset">reset</q-btn>
    <q-btn flat @click="single">single</q-btn>
    <!-- {{ checkStatus() }} -->
  </div>
</template>

<script setup lang="ts">
import { Position } from "src/common/core/mj.game";
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "GameAreaB",
});
const mjStore = useMjStore();

function reset() {
  // mjGame.init();
  // mjGame.separate();
  // mjGame.playerIndex = 0;
  // mjStore.clearNewtile();
  // mjStore.clearSelected();
  mjStore.refresh();
}

function start() {
  //
  mjGame.init([Position.East]);
  // mjGame.shuffle();
  mjGame.start();
  mjStore.refresh();
}

function single() {
  // mjGame.init([Position.East]);
  // mjGame.shuffle();
  // mjGame.singleTest();
  mjStore.refresh();
}
</script>
