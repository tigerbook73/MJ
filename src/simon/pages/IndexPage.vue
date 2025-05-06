<template>
  <q-page class="row flex-center">
    <game-area class="w-90 h-90"></game-area>

    <q-btn class="q-md-lg" :class="myClass" @click="pause">pause</q-btn>

    <q-inner-loading color="primary" :showing="paused">
      <q-btn @click="resume" size="xl" flat>resume</q-btn>
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import GameArea from "src/simon/components/GameArea.vue";
import { computed, ref } from "vue";

defineOptions({
  name: "IndexPage",
});

const paused = ref(false);

function pause() {
  paused.value = true;
}

function resume() {
  paused.value = false;
}

const myClass = computed(() => ({
  "bg-primary": paused.value,
  "bg-secondary": !paused.value,
}));
</script>
