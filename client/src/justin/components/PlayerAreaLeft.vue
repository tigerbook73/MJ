<template>
  <div :class="['column flex-center area-player', color]">
    <div class="row flex-center w-5">
      <comp-tile
        v-for="(tile, index) in mjStore.handTileLeft"
        :key="index"
        :type="IDtoName(tile)"
        position="left"
        size="large"
        :back="true"
      ></comp-tile>
      <comp-tile type="" position="left"></comp-tile>
      <comp-tile :type="IDtoName(mjStore.newTileLeft)" position="left" size="large" :back="true"></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaLeft",
});

import { useMjStore } from "src/justin/stores/mj-store";
import CompTile from "./CompTile.vue";
import { computed } from "vue";
import { findDirectionForPostiion, IDtoName } from "../common/common";

const mjStore = useMjStore();
const color = computed(() =>
  findDirectionForPostiion(mjStore.myPos, 3) === mjStore.game?.current?.position ? "bg-green-5" : "bg-green-0",
);
</script>
