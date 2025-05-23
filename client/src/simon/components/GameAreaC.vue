<template>
  <div>
    <q-btn :disable="!mjStore.canHu" @click="Hu">Hu</q-btn> <q-btn v-if="!mjStore.canHu" @click="Zimo">Zimo</q-btn>
  </div>
</template>

<script setup lang="ts">
// import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/simon/stores/mj-store";

const mjStore = useMjStore();

defineOptions({
  name: "GameAreaC",
});

const emits = defineEmits<{
  (e: "zi-mo"): void;
}>();

function Hu() {
  // //
  // mjGame.canHu();
  // mjStore.refresh();
}

function Zimo() {
  emits("zi-mo");
}
</script>
