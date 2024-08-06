<template>
  <div :class="['column flex-center area-player', userMj.currentPlayer !== 0 ? 'bg-blue' : 'bg-red']">
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.myCards"
        :key="index"
        :type="tile"
        size="large"
        :selected="userMj.selectedCard.id == tile.id"
        @click="onClick(tile)"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaBottom",
});

import CompTile from "components/CompTile.vue";

import { useMjStore } from "src/stores/mj-store";

import { voidTileId } from "src/core/mjCard";

function onClick(tile: (typeof userMj.myCards)[0]) {
  if (userMj.selectedCard.id == tile.id) {
    userMj.selectedCard = { name: "", id: voidTileId, options: { selected: false } };
    return;
  }
  userMj.selectedCard = tile;
}
const userMj = useMjStore();
</script>

<style></style>
