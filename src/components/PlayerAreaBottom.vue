<template>
  <div class="column flex-center area-player">
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.myCards"
        :key="index"
        :type="tile"
        size="large"
        :selected="userMj.mySelectedCard.id == tile.id"
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
  if (userMj.mySelectedCard.id == tile.id) {
    userMj.mySelectedCard = { name: "", id: voidTileId, options: { selected: false } };
    return;
  }
  userMj.mySelectedCard = tile;
}
const userMj = useMjStore();
</script>
