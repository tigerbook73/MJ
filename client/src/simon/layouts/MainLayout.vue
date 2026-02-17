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
import { socketClient } from "src/client/socket-client";

import { appStore, AppState } from "src/simon/stores/app-store";
import { roomStore } from "src/simon/stores/room-store";
import { updateDiscards, useMjStore } from "src/simon/stores/mj-store";
import type { GameEvent } from "@mj/shared";
import { userStore } from "../stores/user-store";
import { setGame } from "../core/mjGame";
import { authService } from "src/client/auth-service";

const router = useRouter();
const useAppStore = appStore();
const useRoomStore = roomStore();
const useGameStore = useMjStore();
const useUserStore = userStore();
// 👂 Socket connection status

async function signOut() {
  try {
    await authService.logout();
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
    await socketClient.quitGame(useRoomStore.currentRoom.name);
    useRoomStore.currentRoom = null;
    useRoomStore.currentPosition = null;
    useGameStore.setCurrentGame(null);
  } catch (error) {
    console.error("Error quitting game:", error);
  }
}

// 👂 Game event handler
// clientApi.onReceive((event: GameEvent) => {
//   const parsed = clientApi.parseEvent(event);

//   useRoomStore.setRooms(parsed.data.rooms);
//   useRoomStore.currentRoom = clientApi.findMyRoom(event);
//   useRoomStore.currentPosition = clientApi.findMyPlayerModel(event)?.position ?? null;

//   const game = clientApi.findMyGame(parsed);
//   if (game) {
//     useGameStore.setCurrentGame(game);
//     // updateDiscards(game);
//     useGameStore.refresh();
//   } else {
//     useGameStore.setCurrentGame(null);
//   }
// });

socketClient.onReceive((raw: GameEvent) => {
  const parsed = socketClient.parseEvent(raw);

  // ---- Room state（统一用 parsed）----
  useRoomStore.setRooms(parsed.data?.rooms ?? []);
  useRoomStore.currentRoom = socketClient.findMyRoom(parsed);
  useRoomStore.currentPosition = socketClient.findMyPlayerModel(parsed)?.position ?? null;

  // ---- 拿到本人的 game ----
  const game = socketClient.findMyGame(parsed) ?? null;

  if (game) {
    // ① 先把弃牌与副露对齐（基于唯一 id 的 openedSet.target）
    //    注意：这里直接改传入的 game（原地修改）
    updateDiscards(game);

    // ② 写入引擎层（把 mjGame 指向这份最新的 game）
    setGame(game);

    // ③ 同步到 Pinia（给 UI/计算属性）
    useGameStore.setCurrentGame(game);

    // ④ 让 UI 从 mjGame 重新映射（p*Cards、discards、latestTile 等）
    useGameStore.refresh();
  } else {
    // 没有局面时清空 UI（是否要清空 mjGame 看你的业务）
    useGameStore.setCurrentGame(null);
    useGameStore.refresh();
  }
});

watch(
  () => useAppStore.appState,
  (state) => {
    switch (state) {
      case AppState.NotConnected:
        router.push("/simon/connecting");
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
