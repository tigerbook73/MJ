<template>
  <div>
    <q-btn flat @click="start">start</q-btn>
    <q-btn flat @click="reset">reset</q-btn>
    <q-btn flat @click="singletest">single</q-btn>
    <!-- {{ checkStatus() }} -->
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
  mjGame.init();
  mjGame.separate();
  mjStore.clearNewtile();
  mjStore.refresh();
}

function start() {
  //
  mjGame.init();
  mjGame.shuffle();
  mjGame.start();
  mjStore.refresh();
}

function singletest() {
  mjGame.init;
  mjGame.shuffle();
  mjGame.singleTest();
  mjStore.refresh();
}
</script>
