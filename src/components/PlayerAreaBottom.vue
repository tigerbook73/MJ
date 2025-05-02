<template>
  <div class="column flex-center area-player">
    <!-- <div class="row justify-between items-start">
      <comp-tile v-for="(tile, index) in userMj.myTiles" :key="index" :type="tile" size="large"></comp-tile>
    </div> -->
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in userMj.myTiles"
        :key="index"
        :type="tile"
        size="large"
        :selected="userMj.mySelected.includes(tile)"
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
import { wait } from "src/utils/timer";

async function onClick(tile: string) {
  if (userMj.mySelected.includes(tile)) {
    userMj.mySelected = [];
    return;
  }

  await wait(1000);
  userMj.mySelected = [tile];
  await wait(1000);
  userMj.mySelected = [];
  await wait(1000);
  userMj.mySelected = [tile];

  /**
   * steps:
   *
   * 1. store.picked = picked
   * 2. wait(500)
   * 3. sorthand()
   * 4. wait(500)
   * 5. selected = discard()
   * 6. wait(500)
   * 7. selected = []
   * 8.
   */
}

const userMj = useMjStore();
</script>
