<template>
  <div class="fullscreen row flex-center q-gutter-md">
    <q-btn label="Example" size="lg" class="col-2" icon="person" @click="() => navigateTo('/example')" />
    <q-btn label="Simon" size="lg" class="col-2" icon="person" @click="() => navigateTo('/simon')" />
    <q-btn label="Justin" size="lg" class="col-2" icon="person" @click="() => navigateTo('/justin')" />
    <q-btn label="React" size="lg" class="col-2" icon="person" @click="() => navigateTo('/react')" />
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
