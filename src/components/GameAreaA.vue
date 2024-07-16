<template>
  <div>
    <q-toggle v-model="mjStore.open" label="明牌" />
    <q-btn flat @click="start">start</q-btn>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GameAreaA",
});
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

const mjStore = useMjStore();

function start() {
  //
  mjGame.init();
  mjGame.shuffle();
  mjGame.startGame();
  mjStore.refresh();
}
</script>
