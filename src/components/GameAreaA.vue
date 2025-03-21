<template>
  <div>
    <q-toggle v-model="mjStore.open" label="明牌" />
    <q-btn flat @click="start"></q-btn>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GameAreaA",
});

const emits = defineEmits<{
  (e: "start-game"): void;
}>();

import { useMjStore } from "src/stores/mj-store";

const mjStore = useMjStore();

async function start() {
  emits("start-game");
}
</script>
