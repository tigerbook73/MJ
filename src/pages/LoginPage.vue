<template>
  <q-page class="q-pa-md bg-green-2 column flex-center">
    <q-card class="q-pa-md bg-grey-1" style="width: 50%">
      <q-card-section class="q-pa-md row q-col-gutter-md">
        <q-input filled v-model="email" class="col-6" label="Username" placeholder="e.g. user1234" />
        <q-input filled v-model="password" class="col-6" label="Password" placeholder="e.g. password1234" />
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions align="right">
        <q-btn class="q-pa-md" type="submit" :loading="loading" label="Connect" color="teal" @click="login_old">
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
import { useRouter } from "vue-router";

import { sendSignIn } from "src/websocket/client.api";
import { useUserStore } from "src/stores/user-store";
import { wait } from "src/core/timer";
// import { GameRequestType, SignInRequest } from "src/common/protocols/apis.models";
// import { clientApi } from "src/client/client-api";

defineOptions({
  name: "LoginPage",
});

const router = useRouter();
const email = ref("Admin@mj.com");
const password = ref("Password");
const loading = ref(false);
const userStore = useUserStore();

async function login_old() {
  loading.value = true;
  await wait(2000);
  const response = await sendSignIn(email.value, password.value);
  if (response.status == "success") {
    userStore.user = response.data;
    router.push("/lobby");
  } else {
    window.alert("failed");
  }
  loading.value = false;
}

// // sign in
// async function signIn() {
//   const request: SignInRequest = {
//     type: GameRequestType.SIGN_IN,
//     data: {
//       email: email.value,
//       password: password.value,
//     },
//   };
//   try {
//     await clientApi.signIn(request.data.email, request.data.password);
//     window.alert("success");
//     router.push("/lobby");
//   } catch (error: any) {
//     window.alert("failed");
//   }
// }
</script>
