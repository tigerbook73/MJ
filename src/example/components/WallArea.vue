<template>
  <div class="column bg-blue-3">
    <!-- top -->
    <div class="hx-3 row">
      <div class="wx-3"></div>
      <wall-area-hori position="top" class="wx-18" />
      <div class="wx-3"></div>
    </div>

    <!-- center -->
    <div class="hx-18 row">
      <wall-area-vert position="left" class="wx-3 hx-full" />
      <discard-area class="wx-18" />
      <wall-area-vert position="right" class="wx-3 hx-full" />
    </div>

    <!-- bottom -->
    <div class="hx-3 row">
      <div class="wx-3"></div>
      <wall-area-hori position="bottom" class="wx-18" />
      <div class="wx-3"></div>
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
