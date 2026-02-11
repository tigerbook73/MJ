import { defineStore } from "pinia";
import type { Game, Position, RoomModel } from "@mj/shared";
import { ref } from "vue";

export const AppState = {
  Unconnected: "UNCONNECTED",
  UnSignedIn: "UNSIGNED_IN",
  InLobby: "IN_LOBBY",
  InGame: "IN_GAME",
} as const;

export type AppState = (typeof AppState)[keyof typeof AppState];

export const useExampleStore = defineStore("example-store", () => {
  // app state
  const appState = ref<AppState>(AppState.Unconnected);
  function refreshAppState() {
    if (!connected.value) {
      appState.value = AppState.Unconnected;
    } else if (!signedIn.value) {
      appState.value = AppState.UnSignedIn;
    } else if (!currentGame.value) {
      appState.value = AppState.InLobby;
    } else {
      appState.value = AppState.InGame;
    }
  }

  // connected state
  const connected = ref(false);
  function setConnected(value: boolean) {
    connected.value = value;

    // reset other value
    signedIn.value = false;
    user.value.password = "";
    roomList.value = [];
    currentRoom.value = null;
    currentPosition.value = null;
    currentGame.value = null;
    refreshAppState();
  }

  // user info
  const user = ref({
    email: "example@email.com",
    password: "",
  });

  // signed in state
  const signedIn = ref(false);
  function setSignedIn(value: boolean) {
    signedIn.value = value;

    if (!value) {
      // reset other value
      user.value.password = "";
      roomList.value = [];
      currentRoom.value = null;
      currentPosition.value = null;
      currentGame.value = null;
    }
    refreshAppState();
  }

  // room info
  const roomList = ref<RoomModel[]>([]);
  const currentRoom = ref<RoomModel | null>(null);
  const currentPosition = ref<Position | null>(null);

  // game info
  const currentGame = ref<Game | null>(null);
  function setCurrentGame(value: Game | null) {
    currentGame.value = value;
    refreshAppState();
  }

  // show all tiles
  const open = ref(false);

  return {
    appState,
    user,
    roomList,
    currentRoom,
    currentPosition,
    currentGame,
    open,
    refreshAppState,
    setConnected,
    setSignedIn,
    setCurrentGame,
  };
});
