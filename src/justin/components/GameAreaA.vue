<template>
  <div>
    <q-toggle v-model="mjStore.open" label="明牌" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GameAreaA",
});

import { useMjStore } from "src/justin/stores/mj-store";

const mjStore = useMjStore();
</script>
