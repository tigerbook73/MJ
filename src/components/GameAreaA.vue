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
// import { autoplay } from "src/control/gameControl";
// import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

const mjStore = useMjStore();

function start() {
  // const playerPositions = mjGame.players
  //   .filter(player => player !== null)
  //   .map(player => player!.position);
  // mjGame.init(playerPositions);
  // mjGame.shuffle();
  // mjGame.startGame();
  // mjStore.refresh();
  // autoplay();
}
</script>
