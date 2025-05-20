<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> MJ App </q-toolbar-title>

        <div class="row q-gutter-sm items-center">
          <div>{{ useUserStore.user?.email }}</div>
          <q-btn v-if="useAppStore.appState === AppState.InGame" dense flat label="Quit Game" @click="quitGame" />
          <q-btn v-if="useAppStore.appState === AppState.InLobby" dense flat label="Sign Out" @click="signOut" />
        </div>
      </q-toolbar>
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
import { userStore } from "../stores/user-store";

const router = useRouter();
const useAppStore = appStore();
const useRoomStore = roomStore();
const useGameStore = useMjStore();
const useUserStore = userStore();
// 👂 Socket connection status

async function signOut() {
  try {
    await clientApi.signOut();
    useUserStore.user = null;
    useUserStore.setSignedIn(false);
  } catch (error) {
    console.error("Error signing out:", error);
  }
}

async function quitGame() {
  if (useRoomStore.currentRoom === null) {
    return;
  }
  try {
    await clientApi.quitGame(useRoomStore.currentRoom.name);
    useRoomStore.currentRoom = null;
    useRoomStore.currentPosition = null;
    useGameStore.setCurrentGame(null);
  } catch (error) {
    console.error("Error quitting game:", error);
  }
}
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
