<template>
  <div :class="['column flex-center area-player', color]">
    <div class="row reverse flex-center">
      <comp-tile
        v-for="(tile, index) in mjStore.handTileTop"
        :key="index"
        :type="mjStore.IDtoName(tile)"
        position="top"
        size="large"
        :back="true"
      ></comp-tile
      ><comp-tile type="" position="top"></comp-tile>
      <comp-tile :type="mjStore.IDtoName(mjStore.newTileTop)" position="top" size="large" :back="true"></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaTop",
});

import CompTile from "src/justin/components/CompTile.vue";
import { useMjStore } from "src/justin/stores/mj-store";
import { computed } from "vue";
import { findDirectionForPostiion } from "../common/common";

const color = computed(() =>
  findDirectionForPostiion(mjStore.myPos, 2) === mjStore.game?.current?.position ? "bg-green-5" : "bg-green-0",
);

const mjStore = useMjStore();
</script>
