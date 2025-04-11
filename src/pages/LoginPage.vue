<template>
  <q-page class="row flex-center">
    <q-card style="width: 50%">
      <q-card-section>
        <q-input v-model="email" label="Email:" />
        <q-input v-model="password" label="Password:" type="password" class="q-mt-sm" />
      </q-card-section>

      <q-card-actions>
        <q-btn label="Sign In" :loading="loading" flat @click="login" class="q-mt-md" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { clientApi } from "src/client/client-api";
import { UserModel } from "src/common/models/user.model";
import { userStore } from "src/stores/user-store";
import { appStore, AppState } from "src/stores/app-store";
import { useQuasar } from "quasar";

defineOptions({ name: "LoginPage" });

const email = ref("a@a.com");
const password = ref("password");
const loading = ref(false);

const router = useRouter();
const $q = useQuasar();
const store = userStore();
const useAppStore = appStore();

onMounted(() => {
  if (store.user) {
    email.value = store.user.email;
    password.value = store.user.password;
    login();
  }
});

async function login() {
  if (!email.value || !password.value) {
    $q.notify({ type: "warning", message: "Email and password cannot be empty" });
    return;
  }

  loading.value = true;

  try {
    const response = await clientApi.signIn(email.value, password.value);

    if (response) {
      if (!store.user) {
        store.user = new UserModel(
          response.name,
          response.firstName || "",
          response.lastName || "",
          response.email,
          response.password,
          response.type,
        );
      }
      store.user.email = email.value;
      store.user.password = password.value;

      useAppStore.setAppState(AppState.InLobby);
      router.push("/join-game");
    } else {
      store.user = null;
      useAppStore.setAppState(AppState.NotLoggedIn);
      $q.notify({ type: "negative", message: "Login failed: " + response });
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    store.user = null;
    useAppStore.setAppState(AppState.NotLoggedIn);
    $q.notify({ type: "negative", message: "An error occurred while logging in" });
  } finally {
    loading.value = false;
  }
}
</script>
