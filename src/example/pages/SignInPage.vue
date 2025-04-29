<template>
  <q-page class="row flex-center">
    <q-card class="col-12 col-sm-8 col-md-6 col-lg-4">
      <q-card-section>
        <q-form @submit.prevent="signIn" class="q-gutter-md">
          <q-input v-model="email" label="Email" type="email" required />
          <q-input v-model="password" label="Password" type="password" required />
          <q-btn type="submit" label="Sign In" color="primary" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");

function signIn() {
  if (email.value && password.value) {
    console.log("Signing in with:", email.value, password.value);
  } else {
    console.error("Email and password are required");
  }
}
</script>
