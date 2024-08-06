<template>
  <div class="column flex-center area-player">
    <div class="row flex-center w-5">
      <comp-tile
        v-for="(tile, index) in userMj.p1DiscardCards"
        :key="index"
        :type="tile"
        size="small"
        position="left"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerDiscardLeft",
});

import CompTile from "components/CompTile.vue";

import { useMjStore } from "src/stores/mj-store";

const userMj = useMjStore();
</script>
