<template>
  <div
    :class="['column flex-center area-player', userMj.isCurrentPlayer(userMj.my_pos % 4) ? 'bg-green-4' : 'bg-green-0']"
  >
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.p1"
        :key="index"
        :type="tile.name"
        :selected="tile === userMj.selectedTile"
        @click="onClick(tile)"
        position="bottom"
        size="large"
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
import { emptyTile, MjTile } from "src/core/mjTile";

const userMj = useMjStore();

function onClick(tile: MjTile) {
  //
  if (userMj.selectedTile != tile) {
    userMj.selectedTile = tile;
  } else {
    userMj.selectedTile = emptyTile;
  }
}
</script>
