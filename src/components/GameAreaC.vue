<template>
  <div><q-btn :disable="!mjStore.canHu" @click="Hu">Hu</q-btn></div>
</template>

<script setup lang="ts">
// import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

const mjStore = useMjStore();

defineOptions({
  name: "GameAreaC",
});

function Hu() {
  // //
  // mjGame.canHu();
  // mjStore.refresh();
}
</script>
