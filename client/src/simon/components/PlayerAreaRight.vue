<template>
  <div
    :class="[
      'row reverse flex-center area-player',
      userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Right) ? 'bg-blue' : 'bg-red',
    ]"
  >
    <div class="column reverse flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.p3Cards"
        :key="index"
        :type="tile"
        size="large"
        position="right"
        :selected="userMj.selectedCard.id == tile.id"
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PlayerAreaRight" });
import CompTile from "src/simon/components/CompTile.vue";

import { Direction, mapPosition, useMjStore } from "src/simon/stores/mj-store";
import { roomStore } from "../stores/room-store";

const userMj = useMjStore();
</script>
