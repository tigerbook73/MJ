<template>
  <div>
    <!-- <q-btn flat @click="pick">pick</q-btn> -->
    <!-- <q-btn flat @click="discard">discard</q-btn> -->
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GameAreaD",
});

// import { mjGame } from "src/core/mjGame";
// import { useMjStore } from "src/stores/mj-store";
// import { wait } from "src/utils/timer";

// const mjStore = useMjStore();

// async function pick() {
//   //
//   await wait(1000);
//   mjGame.pick();
//   mjGame.sort();
//   mjStore.refresh();
//   await wait(1000);
//   mjGame.discard();
//   mjGame.sort();
//   mjStore.refresh();
//   await wait(1000);
//   // mjGame.nextPlayer();
//   // mjStore.refresh();
//   // await wait(1000);
// }

/*
function discard() {
  mjGame.discard();
  //mjGame.nextPlayer();
  mjStore.refresh();
}
*/
</script>
