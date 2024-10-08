<template>
  <div
    :class="[
      'column flex-center area-player',
      userMj.isCurrentPlayer((userMj.my_pos + 3) % 4) ? 'bg-green-4' : 'bg-green-0',
    ]"
  >
    <div class="row flex-center w-5">
      <comp-tile
        v-for="(tile, index) in userMj.p4"
        :key="index"
        :type="tile.name"
        :selected="tile === userMj.selectedTile"
        position="left"
        size="large"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaLeft",
});
import CompTile from "components/CompTile.vue";

import { useMjStore } from "src/stores/mj-store";

const userMj = useMjStore();
</script>
