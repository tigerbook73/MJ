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

import { appStore, AppState } from "src/simon/stores/app-store";
import { userStore } from "src/simon/stores/user-store";
import { roomStore } from "src/simon/stores/room-store";
import { useMjStore } from "src/simon/stores/mj-store";

const router = useRouter();
const useAppStore = appStore();
const useUserStore = userStore();
const useRoomStore = roomStore();
const mjstore = useMjStore();
const useGameStore = useMjStore();

// 👂 Socket connection status

clientApi.gameSocket.onConnect(() => {
  useAppStore.setConnected(true);
});

clientApi.gameSocket.onDisconnect(() => {
  useAppStore.setConnected(false);
  useRoomStore.roomList = [];
  useRoomStore.currentRoom = null;
  useRoomStore.currentPosition = null;
  useGameStore.setCurrentGame(null);
});

// 👂 Game event handler
clientApi.gameSocket.onReceive((event) => {
  const parsed = clientApi.parseEvent(event);

  if (!useUserStore.user) {
    return; // not logged in, ignore
  }

  useRoomStore.setRooms(parsed.data.rooms);

  const game = clientApi.findMyGame(parsed);
  if (game) {
    useGameStore.setCurrentGame(game);
    mjstore.refresh();
  } else {
    useGameStore.setCurrentGame(null);
  }
});

watch(
  () => useAppStore.appState,
  (state) => {
    switch (state) {
      case AppState.NotConnected:
        router.push("/simon/");
        break;
      case AppState.NotLoggedIn:
        router.push("/simon/sign-in");
        break;
      case AppState.InLobby:
        router.push("/simon/join-game");
        break;
      case AppState.InGame:
        router.push("/simon/game-page");
        break;
    }
  },
  { immediate: true },
);
</script>
