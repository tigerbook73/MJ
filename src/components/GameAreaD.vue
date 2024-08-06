<template>
  <div>
    {{ $options.name }}
    <q-btn :disabled="!userMj.status" flat @click="pick">add</q-btn>
    <q-btn :disabled="!userMj.status" flat @click="discard">discard</q-btn>
    <!-- <q-btn flat @click="pick">add</q-btn> -->
    <!-- <q-btn flat @click="discard">discard</q-btn> -->
  </div>
</template>

<script setup lang="ts">
import { mjGame } from "src/core/mjGame";
// import { wait } from "src/core/timer";
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "GameAreaD",
});
const userMj = useMjStore();

async function pick() {
  mjGame.getTile();
  userMj.refresh();
  // await wait(1000);
  //;
}

async function discard() {
  // await pick();
  mjGame.discardTile();
  userMj.refresh();
  // await wait(1000);
}
</script>
