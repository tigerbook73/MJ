<template>
  <q-page class="row flex-center">
    <game-area class="w-90 h-90"></game-area>
  </q-page>
</template>

<script setup lang="ts">
import GameArea from "src/justin/components/GameArea.vue";
import { clientApi } from "src/client/client-api";
import type { GameEvent } from "@common/protocols/apis.models";
import { useMjStore } from "src/justin/stores/mj-store";

defineOptions({
  name: "IndexPage",
});

const mjStore = useMjStore();

clientApi.gameSocket.onReceive((event: GameEvent) => {
  event = clientApi.parseEvent(event);
  mjStore.game = clientApi.findMyGame(event);
});
</script>
