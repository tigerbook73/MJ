<template>
  <div class="column flex-center area-board">
    <div class="row flex-center">
      <comp-tile :type="userMj.p2_display.name" :selected="false" position="right" size="large"></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "BoardAreaB",
});

import CompTile from "components/CompTile.vue";
import { useMjStore } from "src/stores/mj-store";
const userMj = useMjStore();
</script>
