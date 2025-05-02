<template>
  <q-page class="row flex-center">
    <q-card class="col-11 col-sm-8 col-md-6 col-lg-4">
      <q-card-section>
        <div class="text-center">Connecting</div>
      </q-card-section>
      <q-inner-loading color="primary" :showing="true"> </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { AppState, useExampleStore } from "src/example/stores/example-store";
import { onBeforeMount } from "vue";

const exampleStore = useExampleStore();

onBeforeMount(async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    exampleStore.appState = AppState.UnSignedIn;
  } catch {
    //
  }
});
</script>
