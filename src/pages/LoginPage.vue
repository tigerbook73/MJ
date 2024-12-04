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
import { socketSignInAndWaitAck } from "src/websocket/client.api";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const loading = ref(false);
const router = useRouter();

async function login() {
  if (!email.value || !password.value) {
    console.error("Email and password cannot be empty");
    return;
  }

  loading.value = true;

  try {
    // Send sign-in request and wait for acknowledgment
    const response = await socketSignInAndWaitAck(email.value, password.value);

    if (response.status === "success") {
      console.log("Sign-in successful:", response);

      // Save email and password in sessionStorage
      sessionStorage.setItem("userEmail", email.value);
      sessionStorage.setItem("userPassword", password.value);

      // Navigate to Join Page
      router.push("/join-game");
    } else {
      console.error("Sign-in failed:", response.message);
      alert("Login failed: " + response.message);
    }
  } catch (error) {
    console.error("Sign-in error:", error);
  } finally {
    loading.value = false;
  }
}
</script>
