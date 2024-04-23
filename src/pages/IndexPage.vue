<template>
  <q-page class="row flex-center">
    <game-area class="w-90 h-90"></game-area>
  </q-page>
</template>

<script setup lang="ts">
import GameArea from "components/GameArea.vue";

defineOptions({
  name: "IndexPage",
});
</script>
