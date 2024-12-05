<template>
  <div
    class="column flex-center area-player"
    :class="userMj.isCurrentPlayer((userMj.my_pos + 2) % 4) ? 'bg-green-4' : 'bg-green-0'"
  >
    <div class="row reverse flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.p3"
        :key="index"
        :type="tile.name"
        :selected="tile === userMj.selectedTile"
        position="top"
        size="large"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
import CompTile from "components/CompTile.vue";
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "PlayerAreaTop",
});

const userMj = useMjStore();
</script>
