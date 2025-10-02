import { defineStore } from "pinia";
import type { UserModel } from "@common/models/user.model";
import { ref } from "vue";
import { AppState } from "../common/common";
import { useMjStore } from "./mj-store";
import { Position } from "src/common/core/mj.game";

const mjStore = useMjStore();

export const useUserStore = defineStore("user", () => {
  const user = ref<UserModel | null>(null);
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

  // connected state
  const connected = ref<boolean>(false);
  function setConnected(value: boolean) {
    connected.value = value;

    // reset other value
    signedIn.value = false;
    mjStore.roomList = [];
    mjStore.room = null;
    mjStore.myPos = Position.None;
    mjStore.setGame(null);
    refreshAppState();
  }

  function setInGame(value: boolean) {
    inGame.value = value;

    if (!value) {
      mjStore.setGame(null);
    }
  }

  return {
    user,
    inGame,
    appState,

    setInGame,
    refreshAppState,
    setSignedIn,
    setConnected,
  };
});
