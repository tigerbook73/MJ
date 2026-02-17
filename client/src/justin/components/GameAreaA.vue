<template>
  <div>
    <q-toggle v-model="mjStore.open" label="明牌" />
    <q-btn flat @click="signOut">Sign Out</q-btn>
    <q-btn flat @click="quitGame">Quit Game</q-btn>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GameAreaA",
});

import { socketClient } from "src/client/socket-client";
import { useMjStore } from "src/justin/stores/mj-store";
import { useUserStore } from "../stores/user-store";
import { authService } from "src/client/auth-service";

const userStore = useUserStore();
const mjStore = useMjStore();

async function signOut() {
  try {
    await authService.logout();
    userStore.setSignedIn(false);
  } catch (e) {
    console.error(e);
  }
}

async function quitGame() {
  if (!mjStore.room) {
    return;
  }

  try {
    await socketClient.quitGame(mjStore.room.name);
    userStore.setInGame(false);
  } catch (e) {
    console.error(e);
  }
}
</script>
