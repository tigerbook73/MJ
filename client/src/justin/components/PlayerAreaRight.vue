<template>
  <div :class="['column flex-center area-player', color]">
    <div class="row reverse-wrap flex-center w-5">
      <comp-tile
        v-for="(tile, index) in mjStore.handTileRight"
        :key="index"
        :type="mjStore.IDtoName(tile)"
        position="right"
        size="large"
        :back="true"
      ></comp-tile>
      <comp-tile type="" position="right"></comp-tile>
      <comp-tile :type="mjStore.IDtoName(mjStore.newTileRight)" position="right" size="large" :back="true"></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaRight",
});
import CompTile from "src/justin/components/CompTile.vue";
import { useMjStore } from "src/justin/stores/mj-store";
import { computed } from "vue";
import { findDirectionForPostiion } from "../common/common";

const color = computed(() =>
  findDirectionForPostiion(mjStore.myPos, 1) === mjStore.game?.current?.position ? "bg-green-5" : "bg-green-0",
);

const mjStore = useMjStore();
</script>
