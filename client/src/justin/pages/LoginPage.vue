<template>
  <q-page class="q-pa-md bg-green-2 column flex-center">
    <q-card class="q-pa-md bg-grey-1" style="width: 50%">
      <q-card-section class="q-pa-md row q-col-gutter-md">
        <q-input filled v-model="email" class="col-6" label="Username" placeholder="e.g. user1234" />
        <q-input filled v-model="password" class="col-6" label="Password" placeholder="e.g. password1234" />
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions align="right">
        <q-btn class="q-pa-md" type="submit" :loading="loading" label="Connect" color="teal" @click="signIn">
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "src/justin/stores/user-store";
import { clientApi } from "src/client/client-api";
import { useMjStore } from "../stores/mj-store";

defineOptions({
  name: "LoginPage",
});

const email = ref("Admin@mj.com");
const password = ref("Password");
const loading = ref(false);
const userStore = useUserStore();
const mjStore = useMjStore();

// sign in
async function signIn() {
  try {
    loading.value = true;
    mjStore.setSignedIn(true);
    const user = await clientApi.signIn(email.value, password.value);
    userStore.user = user;
  } catch {
    mjStore.setSignedIn(false);
    window.alert("failed");
  } finally {
    loading.value = false;
  }
}
</script>
