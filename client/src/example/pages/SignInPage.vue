<template>
  <q-page class="row flex-center">
    <q-card class="col-12 col-sm-8 col-md-6 col-lg-4">
      <q-card-section>
        <q-form @submit.prevent="signIn" class="q-gutter-md">
          <q-input v-model="exampleStore.user.email" label="Email" type="email" required />
          <q-input v-model="password" label="Password" type="password" required />
          <q-btn type="submit" label="Sign In" color="primary" :disable="loading" />
        </q-form>
        <q-inner-loading color="primary" :showing="loading"> </q-inner-loading>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { authService } from "src/client/auth-service";
import { useExampleStore } from "src/example/stores/example-store";
import { ref } from "vue";

const exampleStore = useExampleStore();
const $q = useQuasar();

const password = ref("password");
const loading = ref(false);

async function signIn() {
  if (!exampleStore.user.email || !password.value) {
    $q.notify({
      type: "warning",
      message: "Please enter email and password",
    });
    return;
  }

  try {
    loading.value = true;
    await authService.login(exampleStore.user.email, password.value);

    $q.notify({
      type: "positive",
      message: "Signed in successfully",
    });
  } catch (error) {
    console.error("Sign in error:", error);

    $q.notify({
      type: "negative",
      message: error instanceof Error ? error.message : "Sign in failed. Please check your email and password.",
    });
  } finally {
    loading.value = false;
  }
}
</script>
