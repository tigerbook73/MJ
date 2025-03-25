<template>
  <q-page class="row flex-center">
    <game-area class="w-90 h-90"></game-area>

    <q-btn class="q-md-lg" @click="initGame">Init Game</q-btn>
  </q-page>
</template>

<script setup lang="ts">
import GameArea from "components/GameArea.vue";
import { clientApi } from "src/client/client-api";
import { Game, Position } from "src/common/core/mj.game";
import { GameEvent } from "src/common/protocols/apis.models";
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";
import { ref } from "vue";

defineOptions({
  name: "IndexPage",
});

const mjStore = useMjStore();

function initGame() {
  mjGame.init([Position.East]);
  mjStore.refresh();
}

// async function startGame() {
//   const response = await clientApi.startGame();
//   if (response) {
//     // game.value = clientApi.findMyGame(response);
//   }

//   mjStore.refresh();
// }

clientApi.gameSocket.onReceive((event: GameEvent) => {
  event = clientApi.parseEvent(event);
  game.value = clientApi.findMyGame(event);
  myfunction(game);
});

const game = ref<Game | null>(null);

function myfunction(game: Game) {
  console.log(game);
}
</script>
