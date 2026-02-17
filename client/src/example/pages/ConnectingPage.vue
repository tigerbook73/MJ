<template>
  <q-page class="row flex-center">
    <q-card class="col-11 col-sm-8 col-md-6 col-lg-4">
      <q-card-section>
        <div class="text-center">Verifying session...</div>
      </q-card-section>
      <q-inner-loading color="primary" :showing="true"> </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { authService } from "src/client/auth-service";
import { useExampleStore } from "src/example/stores/example-store";

const exampleStore = useExampleStore();

onMounted(async () => {
  const restored = await authService.restoreSession();
  if (!restored) {
    exampleStore.setSignedIn(false);
  }
});
</script>
