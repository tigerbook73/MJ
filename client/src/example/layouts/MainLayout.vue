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
        <div class="row q-gutter-sm items-center">
          <div>{{ exampleStore.user.email }}</div>
          <q-btn v-if="exampleStore.appState === AppState.InGame" dense flat label="Quit Game" @click="quitGame" />
          <q-btn v-if="exampleStore.appState === AppState.InLobby" dense flat label="Sign Out" @click="signOut" />
        </div>
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

// to the correct page based on app state
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

// sign out
async function signOut() {
  try {
    await clientApi.signOut();
    exampleStore.user.password = "";
    exampleStore.setSignedIn(false);
  } catch (e) {
    console.error(e);
  }
}

// quit game
async function quitGame() {
  if (!exampleStore.currentRoom) {
    return;
  }

  try {
    await clientApi.quitGame(exampleStore.currentRoom!.name);
  } catch (e) {
    console.error(e);
  }
}

// connection status
clientApi.gameSocket.onConnect(() => {
  exampleStore.setConnected(true);
});
clientApi.gameSocket.onDisconnect(() => {
  exampleStore.setConnected(false);
});

// game event
clientApi.gameSocket.onReceive((event: GameEvent) => {
  event = clientApi.parseEvent(event);

  exampleStore.roomList = event.data.rooms;
  exampleStore.currentRoom = clientApi.findMyRoom(event);
  exampleStore.currentPosition = clientApi.findMyPlayerModel(event)?.position ?? null;
  exampleStore.setCurrentGame(clientApi.findMyGame(event));
});
</script>
