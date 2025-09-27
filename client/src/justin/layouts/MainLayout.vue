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
defineOptions({
  name: "MainLayout",
});
const mjStore = useMjStore();
const route = useRoute();
const router = useRouter();

// to the correct page based on app state
watch(
  () => [mjStore.appState, route.fullPath],
  () => {
    const stateToPath = {
      [AppState.Unconnected]: "/justin/login",
      [AppState.UnSignedIn]: "/justin/login",
      [AppState.InLobby]: "/justin/lobby",
      [AppState.InGame]: "/justin/game",
    };
    const path = stateToPath[mjStore.appState];
    if (path === route.fullPath) {
      return;
    }
    router.push(path);
  },
  { immediate: true },
);

// connection status
clientApi.gameSocket.onConnect(() => {
  mjStore.setConnected(true);
});
clientApi.gameSocket.onDisconnect(() => {
  mjStore.setConnected(false);
});

clientApi.gameSocket.onReceive((event: GameEvent) => {
  event = clientApi.parseEvent(event);

  mjStore.roomList = event.data.rooms;
  mjStore.room = clientApi.findMyRoom(event);
  mjStore.myPos = clientApi.findMyPlayerModel(event)?.position ?? Position.None;
  mjStore.setGame(clientApi.findMyGame(event));
  // mjStore.refresh();
  mjStore.refreshAll();
});
</script>
