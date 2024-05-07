<template>
  <div><q-btn flat @click="pick">pick</q-btn></div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GameAreaD",
});
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

const mjStore = useMjStore();

function pick() {
  //
  mjGame.pickCard();
  mjGame.sortHand();
  mjStore.refresh();
}
</script>
