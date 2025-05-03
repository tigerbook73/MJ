<template>
  <div class="column bg-brown-3">
    <!-- top -->
    <div class="hx-5 wx-full row">
      <div class="wx-5 hx-full"></div>
      <discard-area-hori position="top" class="wx-14" />
      <div class="wx-5 hx-full"></div>
    </div>

    <!-- center -->
    <div class="hx-14 row">
      <discard-area-vert position="left" class="wx-5" />
      <center-area class="wx-14" />
      <discard-area-vert position="right" class="wx-5" />
    </div>

    <!-- bottom -->
    <div class="hx-5 wx-full row">
      <div class="wx-5 hx-full"></div>
      <discard-area-hori position="bottom" class="wx-14" />
      <div class="wx-5 hx-full"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "DiscardArea" };
</script>

<script setup lang="ts">
// define props
import CenterArea from "./CenterArea.vue";
import DiscardAreaHori from "./DiscardAreaHori.vue";
import DiscardAreaVert from "./DiscardAreaVert.vue";
</script>

<style scoped></style>
