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

import { clientApi } from "src/client/client-api";
import { useMjStore } from "src/justin/stores/mj-store";
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore();
const mjStore = useMjStore();

async function signOut() {
  try {
    await clientApi.signOut();
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
    await clientApi.quitGame(mjStore.room.name);
    userStore.setInGame(false);
  } catch (e) {
    console.error(e);
  }
}
</script>
