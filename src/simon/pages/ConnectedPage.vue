<template>
  <q-page class="row flex-center">
    <q-card style="width: 50%">
      <q-card-section>
        <q-input v-model="address" label="Label: "></q-input>
      </q-card-section>

      <q-card-actions>
        <q-btn label="Connect" :loading="loading" flat @click="connect"></q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "ConnectedPage",
});

import { wait } from "src/utils/timer";
import { ref } from "vue";
import { useRouter } from "vue-router";

const address = ref("localHost");

const loading = ref(false);

const router = useRouter();

async function connect() {
  loading.value = true;
  await wait(1000);
  loading.value = false;

  router.push("/sign-in");
}
</script>
