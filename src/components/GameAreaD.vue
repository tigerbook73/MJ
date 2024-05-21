<template>
  <div>
    {{ $options.name }}
    <q-btn flat @click="get">add</q-btn>
  </div>
</template>

<script setup lang="ts">
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "GameAreaD",
});

const mjStore = useMjStore();

function get() {
  mjGame.addTile();
  mjStore.refresh();
  //;
}
</script>
