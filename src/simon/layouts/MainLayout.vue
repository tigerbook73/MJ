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
import { roomStore } from "src/simon/stores/room-store";
import { useMjStore } from "src/simon/stores/mj-store";
import { GameEvent } from "src/common/protocols/apis.models";

const router = useRouter();
const useAppStore = appStore();
const useRoomStore = roomStore();
const useGameStore = useMjStore();

// 👂 Socket connection status

clientApi.gameSocket.onConnect(() => {
  useAppStore.setConnected(true);
});

clientApi.gameSocket.onDisconnect(() => {
  useAppStore.setConnected(false);
  // useRoomStore.roomList = [];
  // useRoomStore.currentRoom = null;
  // useRoomStore.currentPosition = null;
  // useGameStore.setCurrentGame(null);
});

// 👂 Game event handler
clientApi.gameSocket.onReceive((event: GameEvent) => {
  const parsed = clientApi.parseEvent(event);

  useRoomStore.setRooms(parsed.data.rooms);
  useRoomStore.currentRoom = clientApi.findMyRoom(event);
  useRoomStore.currentPosition = clientApi.findMyPlayerModel(event)?.position ?? null;

  const game = clientApi.findMyGame(parsed);
  if (game) {
    useGameStore.setCurrentGame(game);
    useGameStore.refresh();
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
