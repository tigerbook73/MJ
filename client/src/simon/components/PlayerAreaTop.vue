<template>
  <div
    :class="[
      'column reverse flex-center area-player',
      userMj.current?.position !== mapPosition(roomStore().currentPosition!, Direction.Top) ? 'bg-blue' : 'bg-red',
    ]"
  >
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
import { Direction, mapPosition, useMjStore } from "src/simon/stores/mj-store";

defineOptions({ name: "PlayerAreaTop" });
import CompTile from "src/simon/components/CompTile.vue";
import { roomStore } from "../stores/room-store";

const userMj = useMjStore();
</script>
