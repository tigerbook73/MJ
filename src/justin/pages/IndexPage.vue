<template>
  <q-page class="row flex-center">
    <game-area class="w-90 h-90"></game-area>

    <q-btn class="q-md-lg" @click="initGame">Init Game</q-btn>
  </q-page>
</template>

<script setup lang="ts">
import GameArea from "src/justin/components/GameArea.vue";
import { clientApi } from "src/client/client-api";
import { Position } from "src/common/core/mj.game";
import type { GameEvent } from "src/common/protocols/apis.models";
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/justin/stores/mj-store";

defineOptions({
  name: "IndexPage",
});

const mjStore = useMjStore();

function initGame() {
  mjGame.init([Position.East]);
  mjStore.refresh();
}

clientApi.gameSocket.onReceive((event: GameEvent) => {
  event = clientApi.parseEvent(event);
  mjStore.game = clientApi.findMyGame(event);
});
</script>
