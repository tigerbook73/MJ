<template>
  <div :class="['column reverse flex-center area-player', userMj.current?.position !== 2 ? 'bg-blue' : 'bg-red']">
    <div class="row reverse flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.p2Cards"
        :key="index"
        :type="tile"
        size="large"
        position="top"
        :selected="userMj.selectedCard.id == tile.id"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "PlayerAreaTop",
});
import CompTile from "components/CompTile.vue";

const userMj = useMjStore();
</script>
