<template>
  <q-page class="row flex-center">
    <q-card class="col-12 col-sm-8 col-md-6 col-lg-4">
      <q-card-section>
        <q-form @submit.prevent="signIn" class="q-gutter-md">
          <q-input v-model="exampleStore.user.email" label="Email" type="email" required />
          <q-input v-model="exampleStore.user.password" label="Password" type="password" required />
          <q-btn type="submit" label="Sign In" color="primary" />
        </q-form>
        <q-inner-loading color="primary" :showing="loading"> </q-inner-loading>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { clientApi } from "src/client/client-api";
import { AppState, useExampleStore } from "src/example/stores/example-store";
import { onBeforeMount, ref } from "vue";

const exampleStore = useExampleStore();
const $q = useQuasar();

onBeforeMount(() => {
  if (exampleStore.appState !== AppState.UnSignedIn) {
    return;
  }

  if (exampleStore.user.email && exampleStore.user.password) {
    signIn();
  }
});

const loading = ref(false);
async function signIn() {
  if (!exampleStore.user.email && !exampleStore.user.password) {
    return;
  }

  try {
    loading.value = true;
    await clientApi.signIn(exampleStore.user.email, exampleStore.user.password);
    exampleStore.setSignedIn(true);
  } catch {
    exampleStore.setSignedIn(false);

    $q.notify({
      type: "negative",
      message: "Sign in failed. Please check your email and password.",
    });
  } finally {
    loading.value = false;
  }
}
</script>
