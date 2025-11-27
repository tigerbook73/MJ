import { defineStore } from "pinia";
import { ref } from "vue";
import { userStore } from "./user-store";
import { roomStore } from "./room-store";
import { useMjStore } from "./mj-store";

export const AppState = {
  NotConnected: 0,
  NotLoggedIn: 1,
  InLobby: 2,
  InGame: 3,
} as const;

export type AppState = (typeof AppState)[keyof typeof AppState];

const mjStore = useMjStore();
const useUserStore = userStore();
export const appStore = defineStore("app", () => {
  // app state
  const appState = ref<AppState>(AppState.NotConnected);
  function refreshAppState() {
    if (!connected.value) {
      appState.value = AppState.NotConnected;
    } else if (!useUserStore.signedIn) {
      appState.value = AppState.NotLoggedIn;
    } else if (!mjStore.currentGame) {
      appState.value = AppState.InLobby;
    } else {
      appState.value = AppState.InGame;
    }
  }

  // connected state
  const connected = ref(false);
  function setConnected(value: boolean) {
    connected.value = value;

    if (!value) {
      // reset other value
      roomStore().reset();
      useMjStore().reset();
    }

    refreshAppState();
  }

  return {
    appState,
    connected,
    setConnected,
    refreshAppState,
  };
});
