<template>
  <div class="area-player">
    <div>{{ $options.name }}</div>
    <q-btn color="secondary" :disable="!mjStore.canHu" @click="console.log('hu')">胡</q-btn>
  </div>
</template>

<script setup lang="ts">
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "PlayerAreaTop",
});

const mjStore = useMjStore();
</script>
