<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> MJ App </q-toolbar-title>
        <q-space />
        <!-- <div class="row q-gutter-sm items-center">
          <div>{{ mjStore.user.email }}</div>
          <q-btn v-if="mjStore.appState === AppState.InGame" dense flat label="Quit Game" @click="quitGame" />
          <q-btn v-if="mjStore.appState === AppState.InLobby" dense flat label="Sign Out" @click="signOut" />
        </div> -->
        <q-btn flat @click="signOut">Sign Out</q-btn>
        <q-btn flat @click="quitGame">Quit Game</q-btn>
        <q-btn flat @click="enterGame">Enter Game</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <q-list>
        <q-item clickable v-ripple to="/justin/login">
          <q-item-section>Login</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/justin/lobby">
          <q-item-section>Lobby</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/justin/game">
          <q-item-section>Game</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { clientApi } from "src/client/client-api";
import type { GameEvent } from "@common/protocols/apis.models";
import { useMjStore, AppState } from "src/justin/stores/mj-store";
import { useRoute, useRouter } from "vue-router";
import { Position } from "src/common/core/mj.game";
defineOptions({
  name: "MainLayout",
});

const mjStore = useMjStore();
const leftDrawerOpen = ref(false);
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
  mjStore.position = clientApi.findMyPlayerModel(event)?.position ?? Position.None;
  mjStore.setGame(clientApi.findMyGame(event));
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

async function signOut() {
  try {
    await clientApi.signOut();
    mjStore.setSignedIn(false);
  } catch (error: any) {
    window.alert(error.message);
  }
}

async function quitGame() {
  if (!mjStore.room) {
    return;
  }

  try {
    await clientApi.quitGame(mjStore.room.name);
  } catch (e) {
    console.error(e);
  }
}
async function enterGame() {
  //
}
</script>
