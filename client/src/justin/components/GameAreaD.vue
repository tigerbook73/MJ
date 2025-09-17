<template>
  <div>
    <!-- {{ $options.name }} -->
    <q-btn flat v-show="mjStore.isMyTurn" @click="discard">discard</q-btn>
    <q-btn flat v-show="mjStore.isMyTurn" @click="pass">pass</q-btn>
  </div>
</template>

<script setup lang="ts">
import { clientApi } from "src/client/client-api";
import { useQuasar } from "quasar";
import { useMjStore } from "../stores/mj-store";

const $q = useQuasar();
const mjStore = useMjStore();

function discard() {
  try {
    clientApi.actionDrop(mjStore.selectedTile);
  } catch (e) {
    $q.notify({ message: "Discard tile failed", color: "negative", icon: "warning" });
    console.error("Discard tile failed", e);
  }
}

function pass() {
  try {
    clientApi.actionPass();
  } catch (e) {
    $q.notify({ message: "pass failed", color: "negative", icon: "warning" });
    console.error("pass failed", e);
  }
}
defineOptions({ name: "GameAreaD" });
</script>
