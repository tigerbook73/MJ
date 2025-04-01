<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <!-- <q-toolbar>
        <q-toolbar-title> MJ App </q-toolbar-title>

        <div>MJ v0.1</div>
      </q-toolbar> -->
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: "MainLayout",
});

import { watch } from "vue";
import { useRouter } from "vue-router";
import { clientApi } from "src/client/client-api";

import { appStore, AppState } from "src/stores/app-store";
import { userStore } from "src/stores/user-store";
import { roomStore } from "src/stores/room-store";
import { useMjStore } from "src/stores/mj-store";
import { gameStore } from "src/stores/game-store";

const router = useRouter();
const useAppStore = appStore();
const useUserStore = userStore();
const useRoomStore = roomStore();
const mjstore = useMjStore();
const useGameStore = gameStore();

// 👂 Socket connection status

clientApi.gameSocket.onConnect(() => {
  useAppStore.setAppState(AppState.NotLoggedIn);
});

clientApi.gameSocket.onDisconnect(() => {
  useAppStore.setAppState(AppState.NotConnected);
});

// 👂 Game event handler
clientApi.gameSocket.onReceive((event) => {
  const parsed = clientApi.parseEvent(event);

  if (!useUserStore.user) return; // not logged in, ignore

  const game = clientApi.findMyGame(parsed);
  const room = clientApi.findMyRoom(parsed);

  useRoomStore.setRooms(room ? [room] : []);

  if (game) {
    mjstore.refresh();
    useAppStore.setAppState(AppState.InGame);
  } else {
    useGameStore.setGame(null);
    useAppStore.setAppState(AppState.InLobby);
  }
});

watch(
  () => useAppStore.appState,
  (state) => {
    switch (state) {
      case AppState.NotConnected:
        router.push("/");
        break;
      case AppState.NotLoggedIn:
        router.push("/sign-in");
        break;
      case AppState.InLobby:
        router.push("/join-game");
        break;
      case AppState.InGame:
        router.push("/game-page");
        break;
    }
  },
  { immediate: true },
);
</script>
