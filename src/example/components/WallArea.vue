<template>
  <div class="column bg-blue-3">
    <!-- top -->
    <div class="h-3 row">
      <div class="w-3"></div>
      <wall-area-hori position="top" class="w-18" />
      <div class="w-3"></div>
    </div>

    <!-- center -->
    <div class="h-18 row">
      <wall-area-vert position="left" class="w-3 h-full" />
      <discard-area class="w-18" />
      <wall-area-vert position="right" class="w-3 h-full" />
    </div>

    <!-- bottom -->
    <div class="h-3 row">
      <div class="w-3"></div>
      <wall-area-hori position="bottom" class="w-18" />
      <div class="w-3"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "WallArea" };
</script>

<script setup lang="ts">
// define props
import DiscardArea from "./DiscardArea.vue";
import WallAreaHori from "./WallAreaHori.vue";
import WallAreaVert from "./WallAreaVert.vue";
</script>

<style scoped></style>
