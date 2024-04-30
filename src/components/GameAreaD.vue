<template>
  <div>
    {{ $options.name }}
    <q-btn flat @click="Get">start</q-btn>
  </div>
</template>

<script setup lang="ts">
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "GameAreaD",
});

const mjStore = useMjStore();

function Get() {
  //;
}
</script>
