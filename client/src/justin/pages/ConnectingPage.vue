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
import { useUserStore } from "src/justin/stores/user-store";

const userStore = useUserStore();

onMounted(async () => {
  const restored = await authService.restoreSession();
  if (restored) {
    userStore.setSignedIn(true);
  } else {
    userStore.setSignedIn(false);
  }
});
</script>
