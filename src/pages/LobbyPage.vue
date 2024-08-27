<template>
  <q-page class="q-pa-md column flex-center">
    <q-card class="q-pa-md row flex-center" style="width: 80%">
      <div class="q-pa-sm col-10 column flex-center">
        <div>123</div>
        <div>123</div>
      </div>
      <div class="q-pa-sm col-2 column flex-center">
        <q-card-section class="row-10 flex-center">current selection: </q-card-section>
        <q-separator></q-separator>
        <q-btn flat class="flex-center">Join</q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "LobbyPage",
});
</script>
