<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="/svgs/Regular/Chun.svg" />
          </q-avatar>
          Online Mahjong
        </q-toolbar-title>

        <q-space />

        <div>{{ exampleStore.user.email }}</div>
        <q-space />
        <div>{{ exampleStore.appState }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <q-list>
        <q-item clickable v-ripple to="/example/connecting">
          <q-item-section>Connecting</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/example/sign-in">
          <q-item-section>Sign In</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/example/rooms">
          <q-item-section>Room</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/example/game">
          <q-item-section>Game</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="fit">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { AppState, useExampleStore } from "src/example/stores/example-store";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { clientApi } from "src/client/client-api";
import { GameEvent } from "src/common/protocols/apis.models";

// test drawer
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// state management
const exampleStore = useExampleStore();
const route = useRoute();
const router = useRouter();

watch(
  () => [exampleStore.appState, route.fullPath],
  () => {
    const stateToPath = {
      [AppState.Unconnected]: "/example/connecting",
      [AppState.UnSignedIn]: "/example/sign-in",
      [AppState.InLobby]: "/example/rooms",
      [AppState.InGame]: "/example/game",
    };
    const path = stateToPath[exampleStore.appState];
    if (path === route.fullPath) {
      return;
    }
    router.push(path);
  },
  { immediate: true },
);

// connection status
clientApi.gameSocket.onConnect(() => {
  exampleStore.appState = AppState.UnSignedIn;
});
clientApi.gameSocket.onDisconnect(() => {
  exampleStore.appState = AppState.Unconnected;
  exampleStore.roomList = [];
  exampleStore.currentRoom = null;
  exampleStore.currentGame = null;
  exampleStore.currentPosition = null;
});

// game event
clientApi.gameSocket.onReceive((event: GameEvent) => {
  event = clientApi.parseEvent(event);

  exampleStore.roomList = event.data.rooms;
  exampleStore.currentRoom = clientApi.findMyRoom(event);
  exampleStore.currentPosition =
    exampleStore.currentRoom?.players.find((player) => player.userName === exampleStore.user.name)?.position ?? null;
  exampleStore.currentGame = clientApi.findMyGame(event);

  if (exampleStore.currentGame) {
    exampleStore.appState = AppState.InGame;
  } else if (exampleStore.roomList.length > 0) {
    exampleStore.appState = AppState.InLobby;
  }
});
</script>
