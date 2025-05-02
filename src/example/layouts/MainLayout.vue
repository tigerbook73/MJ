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
</script>
