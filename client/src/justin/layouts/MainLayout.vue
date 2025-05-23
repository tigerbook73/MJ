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
import { clientApi } from "src/client/client-api";
import type { GameEvent } from "@common/protocols/apis.models";
import { useMjStore } from "src/justin/stores/mj-store";
import { ref } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "MainLayout",
});

const mjStore = useMjStore();
const router = useRouter();
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

clientApi.gameSocket.onReceive((event: GameEvent) => {
  event = clientApi.parseEvent(event);

  mjStore.setGame(clientApi.findMyGame(event));
  mjStore.room = clientApi.findMyRoom(event);
  mjStore.roomList = event.data.rooms;
  mjStore.position = clientApi.findMyPlayerModel(event)?.position ?? null;
});

async function signOut() {
  try {
    await clientApi.signOut();
    router.push("/justin/login");
  } catch (error: any) {
    window.alert(error.message);
  }
}

async function quitGame() {
  // try {
  //   await clientApi.quitGame(currentRoom.value);
  // } catch (error: any) {
  //   window.alert("quit game failed");
  // }
}
async function enterGame() {
  //
}
</script>
