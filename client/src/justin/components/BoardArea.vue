<template>
  <div class="column w-70 area-board">
    <!-- top -->
    <div class="row h-10">
      <board-area-a class="w-10">T2:L2</board-area-a>
      <comp-tile-wall position="top" class="w-50"></comp-tile-wall>
      <board-area-b class="w-10">T2L8</board-area-b>
    </div>

    <!-- center -->
    <div class="row h-50">
      <comp-tile-wall position="left" class="w-10"></comp-tile-wall>
      <field-area class="w-50"></field-area>
      <comp-tile-wall position="right" class="w-10"></comp-tile-wall>
    </div>

    <!-- bottom -->
    <div class="row h-10">
      <board-area-c class="w-10"></board-area-c>
      <comp-tile-wall position="bottom" class="w-50"></comp-tile-wall>
      <board-area-d class="w-10"></board-area-d>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "BoardArea",
});

import BoardAreaA from "src/justin/components/BoardAreaA.vue";
import BoardAreaB from "src/justin/components/BoardAreaB.vue";
import BoardAreaC from "src/justin/components/BoardAreaC.vue";
import BoardAreaD from "src/justin/components/BoardAreaD.vue";
import CompTileWall from "src/justin/components/CompTileWall.vue";
import FieldArea from "src/justin/components/FieldArea.vue";
</script>
