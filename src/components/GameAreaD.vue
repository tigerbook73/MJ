<template>
  <div>
    {{ $options.name }}
    <q-btn :disabled="!mjStore.status" flat @click="pick">add</q-btn>
    <q-btn :disabled="!mjStore.status" flat @click="discard">discard</q-btn>
  </div>
</template>

<script setup lang="ts">
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "GameAreaD",
});
const mjStore = useMjStore();

function pick() {
  mjGame.getTile();
  mjStore.refresh();
  //;
}

function discard() {
  pick();
  mjGame.discardTile();
  mjStore.refresh();
}
</script>
