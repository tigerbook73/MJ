<template>
  <div>
    <q-toggle v-model="mjStore.open" label="明牌" />
    <q-btn label="Start" flat @click="start" />
    <q-btn label="Reset" flat @click="reset" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GameAreaA",
});

const emits = defineEmits<{
  (e: "start-game"): void;
  (e: "reset-game"): void;
}>();

import { useMjStore } from "src/simon/stores/mj-store";

const mjStore = useMjStore();

async function start() {
  emits("start-game");
}

async function reset() {
  emits("reset-game");
}
</script>
