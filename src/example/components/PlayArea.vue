<template>
  <div class="column square bg-green-3">
    <!-- top -->
    <div class="h-2 row">
      <div class="w-2"></div>

      <play-area-top class="w-20" />
      <div class="w-2"></div>
    </div>

    <!-- center -->
    <div class="h-20 row">
      <play-area-vert position="left" class="w-2" />
      <wall-area class="w-20" />
      <play-area-vert position="right" class="w-2" />
    </div>

    <!-- bottom -->
    <div class="h-2 row">
      <div class="w-2"></div>
      <play-area-me class="w-20" />
      <div class="w-2"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "PlayerArea" };
</script>

<script setup lang="ts">
import WallArea from "../components/WallArea.vue";
import PlayAreaTop from "./PlayAreaTop.vue";
import PlayAreaMe from "./PlayAreaMe.vue";
import PlayAreaVert from "./PlayAreaVert.vue";
</script>

<style scoped lang="scss">
.square {
  aspect-ratio: 1 / 1;
  width: 100%;
  max-width: 100vmin;
  max-height: calc(100vh - 50px);
}
</style>
