<template>
  <div class="area-board">{{ $options.name }} <q-btn flat @click="singletest">single</q-btn></div>
</template>

<script setup lang="ts">
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "BoardAreaB",
});

const mjStore = useMjStore();

function singletest() {
  mjGame.init;
  mjGame.shuffle();
  mjGame.singleTest();
  mjStore.refresh();
}
</script>
