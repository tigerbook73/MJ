<template>
  <q-page class="row flex-center">
    <q-card style="width: 50%">
      <q-card-section>
        <q-input v-model="email" label="Email: "></q-input>
        <q-input v-model="password" label="Password: " type="password"></q-input>
      </q-card-section>

      <q-card-actions>
        <q-btn label="Sign In" :loading="loading" flat @click="login"></q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { clientApi } from "src/client/client-api";
import { UserModel } from "src/common/models/user.model";
import { userStore } from "src/stores/user-store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("a@a.com");
const password = ref("password");
const loading = ref(false);
const router = useRouter();
const store = userStore();

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
