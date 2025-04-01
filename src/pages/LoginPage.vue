<template>
  <q-page class="row flex-center">
    <q-card style="width: 50%">
      <q-card-section>
        <q-input v-model="email" label="Email: "></q-input>
        <q-input v-model="password" label="Password: " type="password" class="q-mt-sm"></q-input>
      </q-card-section>

      <q-card-actions>
        <q-btn label="Sign In" :loading="loading" flat @click="login" class="q-mt-md"></q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { clientApi } from "src/client/client-api";
import { UserModel } from "src/common/models/user.model";
import { userStore } from "src/stores/user-store";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { appStore, AppState } from "src/stores/app-store";

const email = ref("a@a.com");
const password = ref("password");
const loading = ref(false);
const router = useRouter();
const store = userStore();



onMounted(() => {
  if (store.user) {
    email.value = store.user.email;
    password.value = store.user.password;
    login();
  }
});

async function login() {
  if (!email.value || !password.value) {
    console.error("Email and password cannot be empty");
    return;
  }

  loading.value = true;

  try {
    // Send sign-in request and wait for acknowledgment
    const response = await clientApi.signIn(email.value, password.value);

    if (response) {
      console.log("Sign-in successful:", response);

      if (!store.user) {
        store.user = new UserModel(
          response.name,
          response.firstName || "",
          response.lastName || "",
          response.email,
          response.password,
          response.type,
        );
        appStore.setAppState(AppState.InLobby);
      }
      store.user.email = email.value;
      store.user.password = password.value;

      // Navigate to Join Page
      router.push("/join-game");
    } else {
      console.error("Sign-in failed:", response);
      alert("Login failed: " + response);
    }
  } catch (error) {
    console.error("Sign-in error:", error);
  } finally {
    loading.value = false;
  }
}
</script>
