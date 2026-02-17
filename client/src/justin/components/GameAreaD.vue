<template>
  <div class="column">
    <!-- {{ $options.name }} -->
    <q-btn flat style="width: 100%" v-show="mjStore.canTsumo || mjStore.canAnKan" @click="discard">discard</q-btn>
    <q-btn flat style="width: 100%" v-show="mjStore.isMyTurn" @click="pass">pass</q-btn>
  </div>
</template>

<script setup lang="ts">
import { socketClient } from "src/client/socket-client";
import { useQuasar } from "quasar";
import { useMjStore } from "../stores/mj-store";

defineOptions({ name: "GameAreaD" });

const $q = useQuasar();
const mjStore = useMjStore();

function discard() {
  try {
    if (mjStore.selectedList.length === 1) {
      socketClient.actionDrop(mjStore.selectedList[0]);
      mjStore.clearSelected();
    }
  } catch (e) {
    $q.notify({ message: "Discard tile failed", color: "negative", icon: "warning" });
    console.error("Discard tile failed", e);
  }
}

function pass() {
  try {
    socketClient.actionPass();
    mjStore.clearSelected();
  } catch (e) {
    $q.notify({ message: "pass failed", color: "negative", icon: "warning" });
    console.error("pass failed", e);
  }
}
</script>
