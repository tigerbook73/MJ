<template>
  <div class="column area-board btn-stack">
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canChi" @click="chi">吃</q-btn>
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canPon" @click="pon">碰</q-btn>
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canKan" @click="kan">杠</q-btn>
    <q-btn style="width: 100%" class="bg-grey" v-show="mjStore.canRon" @click="ron">和</q-btn>
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
  mjStore.allowMultiSelect = true;
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
