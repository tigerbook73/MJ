<template>
  <div class="row reverse reverse-wrap items-start content-start full-height">
    <comp-tile
      v-for="(tile, index) in mjStore.discardTop"
      :key="index"
      :type="IDtoName(tile)"
      position="top"
      size="small"
    ></comp-tile>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardTop",
});

import { IDtoName } from "../common/common";
import { useMjStore } from "src/justin/stores/mj-store";
import CompTile from "./CompTile.vue";
const mjStore = useMjStore();
</script>
