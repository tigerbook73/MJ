<template>
  <div class="column bg-brown-3">
    <!-- top -->
    <div class="h-5 w-full row">
      <div class="w-5 h-full"></div>
      <discard-area-hori position="top" class="w-14" />
      <div class="w-5 h-full"></div>
    </div>

    <!-- center -->
    <div class="h-14 row">
      <discard-area-vert position="left" class="w-5" />
      <div class="w-14 bg-green"></div>
      <discard-area-vert position="right" class="w-5" />
    </div>

    <!-- bottom -->
    <discard-area-hori position="bottom" class="h-5" />
  </div>
</template>

<script lang="ts">
export default { name: "DiscardArea" };
</script>

<script setup lang="ts">
// define props
import DiscardAreaHori from "./DiscardAreaHori.vue";
import DiscardAreaVert from "./DiscardAreaVert.vue";
</script>

<style scoped></style>
