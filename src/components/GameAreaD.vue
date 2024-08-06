<template>
  <div>
    {{ $options.name }}
    <q-btn :disabled="!mjStore.status" flat @click="pick">add</q-btn>
    <q-btn :disabled="!mjStore.status" flat @click="discard">discard</q-btn>
  </div>
</template>

<script setup lang="ts">
import { mjGame } from "src/core/mjGame";
// import { wait } from "src/core/timer";
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "GameAreaD",
});
const mjStore = useMjStore();

async function pick() {
  mjGame.getTile();
  mjStore.refresh();
  // await wait(1000);
  //;
}

async function discard() {
  // await pick();
  mjGame.discardTile();
  mjStore.refresh();
  // await wait(1000);
}
</script>
