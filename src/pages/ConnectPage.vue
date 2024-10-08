<template>
  <q-page class="row flex-center">
    <q-card style="width: 50%">
      <q-card-section>
        <q-input v-model="address" label="Address" />
        <q-input v-model="address" label="Address" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Connect" color="primary" :loading="loading" @click="connect" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { wait } from "src/utils/timer";
import { ref } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "ConnectPage",
});

const router = useRouter();

const address = ref("localhost:8080");

const loading = ref(false);

async function connect() {
  //
  loading.value = true;
  await wait(1000);
  loading.value = false;

  router.push("/");
}
</script>
