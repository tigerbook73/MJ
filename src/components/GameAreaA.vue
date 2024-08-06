<template>
  <div>
    <q-toggle v-model="mjStore.open" label="明牌" />
    <q-btn flat @click="start">start</q-btn>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GameAreaA",
});
import { mjGame, State } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";
import { wait } from "src/utils/timer";
import { voidTileId } from "src/core/mjCard";

const mjStore = useMjStore();

function start() {
  //
  mjGame.init();
  mjGame.shuffle();
  mjGame.startGame();
  mjStore.refresh();
  autoplay();
}

async function autoplay() {
  //
  while (mjGame.state === State.Start && !mjGame.canHu()) {
    await wait(1000);
    mjGame.pick();
    mjStore.refresh();
    await wait(1000);
    selectedCard();
    await wait(1000);
    mjGame.discard();
    unselectedCard();
    mjGame.sort();
    mjStore.refresh();
    await wait(1000);
    mjGame.nextPlayer();
    mjStore.refresh();
    await wait(1000);
  }
}

function selectedCard() {
  mjStore.selectedCard = {
    name: mjGame.discardCard().name,
    id: mjGame.discardCard().id,
    options: { selected: false },
  };
}

function unselectedCard() {
  mjStore.selectedCard = { name: "", id: voidTileId, options: { selected: false } };
}
</script>
