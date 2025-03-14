<template>
  <div>
    <!-- {{ $options.name }} -->
    <q-btn :disabled="!userMj.status" flat @click="pick">add</q-btn>
    <q-btn :disabled="!userMj.status" flat @click="discard">discard</q-btn>
    <q-btn :disabled="!userMj.status" flat @click="repeat">loop</q-btn>
  </div>
</template>

<script setup lang="ts">
// import { autoPlay } from "src/control/mjAutoPlay";
// import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "GameAreaD",
});
const userMj = useMjStore();

async function pick() {
  // mjGame.getTile();
  userMj.refresh();
}

async function discard() {
  // mjGame.selectTile();
  // mjGame.discardTile();
  // mjGame.sortTile();
  // mjGame.updatePlayer();
  userMj.refresh();
}

async function repeat() {
  // autoPlay();
}
</script>
