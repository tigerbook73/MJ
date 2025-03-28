<template>
  <div class="column reverse wrap items-start content-start full-height">
    <comp-tile
      v-for="(tile, index) in userMj.discardSouth"
      :key="index"
      :type="userMj.IDtoName(tile)"
      position="right"
      size="small"
    ></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardRight",
});

import CompTile from "components/CompTile.vue";
import { useMjStore } from "src/stores/mj-store";

const userMj = useMjStore();
</script>
