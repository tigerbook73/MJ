import { defineStore } from "pinia";
import type { UserModel } from "@mj/shared";
import { ref } from "vue";
import { AppState } from "../common/common";
import { useMjStore } from "./mj-store";
import { Position } from "@mj/shared";

const mjStore = useMjStore();

export const useUserStore = defineStore("user", () => {
  const user = ref<UserModel | null>(null);
  const email = ref<string>("");
  const password = ref<string>("");
  const appState = ref<AppState>(AppState.Unconnected);
  const inGame = ref<boolean>(false);

  function refreshAppState() {
    if (!connected.value) {
      appState.value = AppState.Unconnected;
    } else if (!signedIn.value) {
      appState.value = AppState.UnSignedIn;
    } else if (!inGame.value) {
      appState.value = AppState.InLobby;
    } else {
      appState.value = AppState.InGame;
    }
  }

  // connected state
  const connected = ref<boolean>(false);
  function setConnected(value: boolean) {
    connected.value = value;
    if (!value) {
      signedIn.value = false;
      mjStore.roomList = [];
      mjStore.room = null;
      mjStore.myPos = Position.None;
      mjStore.setGame(null);
      // reset other value
    }

    refreshAppState();
  }

  // signed in state
  const signedIn = ref<boolean>(false);
  function setSignedIn(value: boolean) {
    signedIn.value = value;

    if (!value) {
      // reset other value
      mjStore.roomList = [];
      mjStore.room = null;
      mjStore.myPos = Position.None;
      mjStore.setGame(null);
    }
    refreshAppState();
  }

  function setInGame(value: boolean) {
    inGame.value = value;

    if (!value) {
      mjStore.setGame(null);
    }
    refreshAppState();
  }

  return {
    user,
    email,
    password,
    inGame,

    appState,

    setInGame,
    refreshAppState,
    setSignedIn,
    setConnected,
  };
});
