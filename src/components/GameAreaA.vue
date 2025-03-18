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

import { clientApi } from "src/client/client-api";
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

const mjStore = useMjStore();

async function start() {
  try {
    const response = await clientApi.startGame();

    if (response) {
      mjGame.start();
      mjStore.refresh();
    } else {
      console.error("Game start failed: No game data in response");
    }
  } catch (error) {
    console.error("Error starting game:", error);
  }
}
</script>
