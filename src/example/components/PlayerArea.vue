<template>
  <div class="column square bg-green-3">
    <!-- top -->
    <div class="hx-2 row">
      <div class="wx-2"></div>

      <player-area-top class="wx-20" />
      <div class="wx-2"></div>
    </div>

    <!-- center -->
    <div class="hx-20 row">
      <player-area-vert position="left" class="wx-2" />
      <wall-area class="wx-20" />
      <player-area-vert position="right" class="wx-2" />
    </div>

    <!-- bottom -->
    <div class="hx-2 row">
      <div class="wx-2"></div>
      <player-area-me class="wx-20" />
      <div class="wx-2"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "PlayerArea" };
</script>

<script setup lang="ts">
import WallArea from "../components/WallArea.vue";
import PlayerAreaTop from "./PlayerAreaTop.vue";
import PlayerAreaMe from "./PlayerAreaMe.vue";
import PlayerAreaVert from "./PlayerAreaVert.vue";
</script>

<style scoped lang="scss">
.square {
  aspect-ratio: 1 / 1;
  width: 100%;
  max-width: 100vmin;
  max-height: calc(100vh - 50px);
}
</style>
