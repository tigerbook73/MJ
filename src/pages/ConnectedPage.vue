<template>
  <q-page class="row flex-center">
    <div>Connected Page</div>
    <q-input v-model="address" label="Label: "></q-input>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "ConnectedPage",
});

import { ref } from "vue";

const address = ref("localHost");
</script>
