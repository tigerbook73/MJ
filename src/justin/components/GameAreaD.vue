<template>
  <div>
    <!-- {{ $options.name }} -->
    <q-btn flat @click="pick">add</q-btn>
    <q-btn flat @click="discard">discard</q-btn>
    <q-btn flat @click="hu">hu</q-btn>
  </div>
</template>

<script setup lang="ts">
// import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/justin/stores/mj-store";

defineOptions({
  name: "GameAreaD",
});
const userMj = useMjStore();

async function pick() {
  userMj.refresh();
}

async function discard() {
  // mjGame.drop(userMj.selectedTile);
  userMj.refresh();
}

async function hu() {
  //
}
</script>
