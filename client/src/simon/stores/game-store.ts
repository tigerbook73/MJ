import { defineStore } from "pinia";
import { Game } from "src/common/core/mj.game";
import { ref } from "vue";

export const gameStore = defineStore("game", () => {
  const currentGame = ref<Game | null>(null);

  function setGame(game: Game | null) {
    currentGame.value = game;
  }

  return { currentGame, setGame };
});
