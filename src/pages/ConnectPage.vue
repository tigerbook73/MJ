<template>
  <q-page class="q-pa-md bg-green-2 column flex-center">
    <q-card class="q-pa-md bg-grey-1" style="width: 50%">
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
        <q-btn class="q-pa-md bg-green-2" @click="connect"> Connect </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
defineOptions({
  name: "ConnectPage",
});

const router = useRouter();
const username = ref("");
const password = ref("");
const address = ref("");
function connect() {
  router.push("/lobby");
}
</script>
