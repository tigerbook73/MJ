<template>
  <div class="fullscreen row flex-center q-gutter-md">
    <q-btn label="Example Site" size="lg" class="col-2" icon="person" @click="() => navigateTo('/example')" />
    <q-btn label="Simon Site" size="lg" class="col-2" icon="person" @click="() => navigateTo('/simon')" />
    <q-btn label="Justin Site" size="lg" class="col-2" icon="person" @click="() => navigateTo('/justin')" />
    <q-btn label="React Site" size="lg" class="col-2" icon="person" @click="() => navigateTo('/react')" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "LandingPage",
});

function navigateTo(path: string) {
  window.location.href = path;
}
</script>
