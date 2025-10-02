<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { clientApi } from "src/client/client-api";
import type { GameEvent } from "@common/protocols/apis.models";
import { useMjStore } from "src/justin/stores/mj-store";
import { useRoute, useRouter } from "vue-router";
import { Position } from "src/common/core/mj.game";
import { AppState } from "../common/common";
import { useUserStore } from "../stores/user-store";
defineOptions({
  name: "MainLayout",
});
const mjStore = useMjStore();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

// to the correct page based on app state
watch(
  () => [userStore.appState, route.fullPath],
  () => {
    const stateToPath = {
      [AppState.Unconnected]: "/justin/login",
      [AppState.UnSignedIn]: "/justin/login",
      [AppState.InLobby]: "/justin/lobby",
      [AppState.InGame]: "/justin/game",
    };
    const path = stateToPath[userStore.appState];
    if (path === route.fullPath) {
      return;
    }
    router.push(path);
  },
  { immediate: true },
);

// connection status
clientApi.gameSocket.onConnect(() => {
  userStore.setConnected(true);
});
clientApi.gameSocket.onDisconnect(() => {
  userStore.setConnected(false);
});

clientApi.gameSocket.onReceive((event: GameEvent) => {
  event = clientApi.parseEvent(event);
  const game = clientApi.findMyGame(event);
  if (game) {
    userStore.setInGame(true);
  }

  mjStore.roomList = event.data.rooms;
  mjStore.room = clientApi.findMyRoom(event);
  mjStore.myPos = clientApi.findMyPlayerModel(event)?.position ?? Position.None;

  mjStore.setGame(game);

  userStore.refreshAppState();
  mjStore.refreshAll();
});
</script>
