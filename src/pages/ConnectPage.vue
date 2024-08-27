<template>
  <q-page class="q-pa-md column flex-center">
    <q-card class="q-pa-md" style="width: 50%">
      <q-card-section>
        <q-input filled v-model="ph" label="Address" placeholder="website address" :dense="dense" />
      </q-card-section>
      <q-card-section>
        <q-btn align="right"> Connect </q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      text: ref(""),
      ph: ref(""),
      dense: ref(false),
    };
  },
};
</script>
