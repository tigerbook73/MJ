<template>
  <div class="column flex-center area-player">
    <div class="row flex-center w-5">
      <comp-tile
        v-for="(tile, index) in userMj.p3DiscardCards"
        :key="index"
        :type="tile"
        size="small"
        position="right"
      ></comp-tile>
    </div>
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
