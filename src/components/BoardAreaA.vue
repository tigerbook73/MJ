<template>
  <div class="column flex-center area-board">
    <div class="row flex-center">
      <comp-tile :type="userMj.p3_display.name" :selected="false" position="top" size="large"></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "BoardAreaA",
});

import CompTile from "components/CompTile.vue";
import { useMjStore } from "src/stores/mj-store";
const userMj = useMjStore();
</script>
