<template>
  <q-page class="q-pa-md bg-green-2 column flex-center">
    <q-card class="q-pa-md bg-grey-1" style="width: 50%" @click="testpage">
      <q-card-section class="q-pa-md row q-col-gutter-md">
        <q-input filled v-model="username" class="col-6" label="Username" placeholder="e.g. user1234" />
        <q-input filled v-model="password" class="col-6" label="Password" placeholder="e.g. password1234" />
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="q-pa-md row q-col-gutter-md">
        <q-input filled v-model="address" class="col-6" label="Lobby Number" placeholder="e.g. lobby1" />
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions align="right">
        <q-btn class="q-pa-md" type="submit" :loading="connecting" label="Connect" color="teal" @click="connect">
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { wait } from "src/core/timer";
import { ref } from "vue";
import { useRouter } from "vue-router";
defineOptions({
  name: "ConnectPage",
});

const router = useRouter();
const username = ref("");
const password = ref("");
const address = ref("");
const connecting = ref(false);

async function connect() {
  connecting.value = true;
  await wait(2000);
  if (username.value == "Admin" && password.value == "Password" && address.value == "1") {
    router.push("/lobby");
  }
  connecting.value = false;
}

function testpage() {
  router.push("/lobby");
}
</script>
