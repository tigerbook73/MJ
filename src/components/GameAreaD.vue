<template>
  <div>
    <q-btn flat @click="pick">pick</q-btn>
    <!-- <q-btn flat @click="discard">discard</q-btn> -->
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GameAreaD",
});
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

const mjStore = useMjStore();

function pick() {
  //
  mjGame.pick();
  mjStore.refresh();
  mjGame.discard();
  mjStore.refresh();
}

/*
function discard() {
  //
  mjGame.discard();
  //mjGame.nextPlayer();
  mjStore.refresh();
}
*/
</script>
