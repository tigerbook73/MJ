<template>
  <div
    class="column flex-center area-player"
    :class="userMj.isCurrentPlayer((userMj.my_pos + 1) % 4) ? 'bg-green-4' : 'bg-green-0'"
  >
    <div class="row reverse-wrap flex-center w-5">
      <comp-tile
        v-for="(tile, index) in userMj.p2"
        :key="index"
        :type="userMj.IDtoName(tile)"
        :selected="tile === userMj.selectedTile"
        position="right"
        size="large"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaRight",
});
import CompTile from "components/CompTile.vue";
import { useMjStore } from "src/stores/mj-store";

const userMj = useMjStore();
</script>
