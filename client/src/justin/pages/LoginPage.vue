<template>
  <q-page class="q-pa-md bg-green-2 column flex-center">
    <q-card class="q-pa-md bg-grey-1" style="width: 50%">
      <q-card-section class="q-pa-md row q-col-gutter-md">
        <q-input filled v-model="userStore.email" class="col-6" label="Username" placeholder="e.g. user1234@mj.com" />
        <q-input filled v-model="userStore.password" class="col-6" label="Password" placeholder="e.g. password1234" />
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
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "src/justin/stores/user-store";
import { AppState } from "../common/common";
import { authService } from "src/client/auth-service";

defineOptions({
  name: "LoginPage",
});

const loading = ref(false);
const userStore = useUserStore();
onBeforeMount(() => {
  if (userStore.appState !== AppState.UnSignedIn) {
    return;
  }

  if (userStore.user !== null && userStore.email && userStore.password) {
    signIn();
  }
});

// sign in
async function signIn() {
  try {
    loading.value = true;
    await authService.loginOrRegister(userStore.email, userStore.password);
    userStore.setSignedIn(true);
  } catch {
    userStore.setSignedIn(false);
    window.alert("failed");
  } finally {
    loading.value = false;
  }
}
</script>
