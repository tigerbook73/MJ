<template>
  <div class="area-board">
    <!-- {{ $options.name }} -->
    <q-btn flat @click="start">start</q-btn>
    <!-- {{ checkStatus() }} -->
  </div>
</template>

<script setup lang="ts">
// import { Position } from "src/common/core/mj.game";
// import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/justin/stores/mj-store";

defineOptions({
  name: "GameAreaB",
});
const mjStore = useMjStore();

function start() {
  //
  // mjGame.init([Position.East]);
  // mjGame.shuffle();
  // mjGame.start();
  mjStore.refresh();
}
</script>
