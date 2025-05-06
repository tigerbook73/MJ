import { defineStore } from "pinia";
import { ref } from "vue";

export enum AppState {
  NotConnected,
  NotLoggedIn,
  InLobby,
  InGame,
}

export const appStore = defineStore("app", () => {
  const appState = ref<AppState>(AppState.NotConnected);
  const setAppState = (state: AppState) => (appState.value = state);
  return { appState, setAppState };
});
