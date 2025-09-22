<template>
  <div class="column area-board btn-stack">
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canChi" @click="chi">吃</q-btn>
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canPon" @click="pon">碰</q-btn>
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canKan" @click="kan">杠</q-btn>
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canRon" @click="ron">和</q-btn>
  </div>
</template>

<script setup lang="ts">
import { useMjStore } from "../stores/mj-store";

defineOptions({ name: "BoardAreaD" });
const mjStore = useMjStore();
function chi() {
  //
}
function pon() {
  //
}
function kan() {
  //
}
function ron() {
  //
}
</script>

<style scoped>
.btn-stack {
  gap: 3px;
}
</style>
