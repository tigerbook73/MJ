<template>
  <div class="column area-board btn-stack">
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canChi" @click="chi">吃</q-btn>
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canPon" @click="pon">碰</q-btn>
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canKan" @click="kan">杠</q-btn>
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canRon" @click="ron">和</q-btn>
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canAnKan" @click="anKan">杠</q-btn>
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canTsumo" @click="tsumo">和</q-btn>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { useMjStore } from "../stores/mj-store";
import { clientApi } from "src/client/client-api";

defineOptions({ name: "BoardAreaD" });

const $q = useQuasar();
const mjStore = useMjStore();

function chi() {
  //
  if (mjStore.selectedList.length === 2) {
    try {
      clientApi.actionChi([mjStore.selectedList[0], mjStore.selectedList[1]]);
    } catch (e) {
      $q.notify({ message: "Action Chi failed", color: "negative", icon: "warning" });
      console.error("Action Chi failed", e);
    }
  }
}

function pon() {
  //
  if (mjStore.selectedList.length === 2) {
    try {
      clientApi.actionPeng([mjStore.selectedList[0], mjStore.selectedList[1]]);
    } catch (e) {
      $q.notify({ message: "Action Pon failed", color: "negative", icon: "warning" });
      console.error("Action Pon failed", e);
    }
  }
}

function kan() {
  //
  if (mjStore.selectedList.length === 3) {
    try {
      clientApi.actionGang([mjStore.selectedList[0], mjStore.selectedList[1], mjStore.selectedList[2]]);
    } catch (e) {
      $q.notify({ message: "Action Kan failed", color: "negative", icon: "warning" });
      console.error("Action Kan failed", e);
    }
  }
}
function anKan() {
  //
  if (mjStore.selectedList.length === 3) {
    try {
      clientApi.actionAngang([
        mjStore.selectedList[0],
        mjStore.selectedList[1],
        mjStore.selectedList[2],
        mjStore.selectedList[3],
      ]);
    } catch (e) {
      $q.notify({ message: "Action anKan failed", color: "negative", icon: "warning" });
      console.error("Action anKan failed", e);
    }
  }
}

function ron() {
  //
  try {
    clientApi.actionHu();
  } catch (e) {
    $q.notify({ message: "Action Ron failed", color: "negative", icon: "warning" });
    console.error("Aciton Ron failed", e);
  }
}

function tsumo() {
  //
  try {
    clientApi.actionZimo();
  } catch (e) {
    $q.notify({ message: "Action tsumo failed", color: "negative", icon: "warning" });
    console.error("Aciton tsumo failed", e);
  }
}
</script>

<style scoped>
.btn-stack {
  gap: 3px;
}
</style>
