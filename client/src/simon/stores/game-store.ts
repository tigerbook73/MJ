import { defineStore } from "pinia";
import type { Game } from "@mj/shared/common/core/mj.game";
import { ref } from "vue";

export const gameStore = defineStore("game", () => {
  const currentGame = ref<Game | null>(null);

  function setGame(game: Game | null) {
    currentGame.value = game;
  }

  return { currentGame, setGame };
});
