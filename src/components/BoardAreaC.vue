<template>
  <div class="column flex-center area-board">
    <div class="row flex-center">
      <comp-tile :type="userMj.p4_new.name" :selected="false" position="left" size="large"></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "BoardAreaC",
});

import CompTile from "components/CompTile.vue";
import { useMjStore } from "src/stores/mj-store";
const userMj = useMjStore();
</script>
