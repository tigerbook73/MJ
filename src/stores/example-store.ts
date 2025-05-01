import { defineStore } from "pinia";
import { Game, Position } from "src/common/core/mj.game";
import { RoomModel } from "src/common/models/room.model";
import { ref } from "vue";

export enum AppState {
  Unconnected = "UNCONNECTED",
  UnSignedIn = "UNSIGNED_IN",
  InLobby = "IN_LOBBY",
  InGame = "IN_GAME",
}

export const useExampleStore = defineStore("example-store", () => {
  // app state
  const appState = ref<AppState>(AppState.Unconnected);

  // user info
  const userName = ref<string | null>(null);
  const userEmail = ref<string | null>(null);

  // room info
  const roomList = ref<RoomModel[]>([]);
  const currentRoom = ref<RoomModel | null>(null);
  const currentPosition = ref<Position | null>(null);

  // game info
  const currentGame = ref<Game | null>(null);

  return {
    appState,
    game: currentGame,
    userName,
    userEmail,
    roomList,
    currentRoom,
    currentPosition,
  };
});
