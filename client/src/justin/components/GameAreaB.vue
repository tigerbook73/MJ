<template>
  <div class="area-board">
    <!-- {{ $options.name }} -->
    <q-btn flat @click="start">start</q-btn>
    <q-btn flat @click="reset">reset</q-btn>
    <!-- {{ checkStatus() }} -->
  </div>
</template>

<script setup lang="ts">
import { clientApi } from "src/client/client-api";
import { useQuasar } from "quasar";

defineOptions({ name: "GameAreaB" });
const $q = useQuasar();

function start() {
  try {
    clientApi.startGame();
  } catch (e) {
    $q.notify({ message: "Game start failed", color: "negative", icon: "warning" });
    console.error("Game start failed", e);
  }
}

function reset() {
  try {
    clientApi.resetGame();
  } catch (e) {
    $q.notify({ message: "Game reset failed", color: "negative", icon: "warning" });
    console.error("Game reset failed", e);
  }
}
</script>
