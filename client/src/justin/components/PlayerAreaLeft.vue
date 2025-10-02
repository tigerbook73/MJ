<template>
  <div :class="['column flex-center area-player', color]">
    <div class="row flex-center w-5">
      <comp-tile
        v-for="(tile, index) in mjStore.handTileLeft"
        :key="index"
        :type="IDtoName(tile)"
        position="left"
        size="large"
        :back="!showHand"
      />
      <comp-tile type="" position="left" />
      <comp-tile :type="IDtoName(mjStore.newTileLeft)" position="left" size="large" :back="!showHand" />
      <div
        class="row flex-center w-5"
        v-for="(row, rowIndex) in mjStore.meldsLeft"
        :key="rowIndex"
        style="display: flex"
      >
        <comp-tile type="" position="left" />

        <comp-tile
          v-for="(tile, colIndex) in row.tiles"
          :key="`${rowIndex}-${colIndex}`"
          :type="IDtoName(tile)"
          position="left"
          size="large"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaLeft",
});

import { useMjStore } from "src/justin/stores/mj-store";
import CompTile from "./CompTile.vue";
import { computed } from "vue";
import { findDirectionForPostiion, IDtoName } from "../common/common";
import { GameState } from "src/common/core/mj.game";

const mjStore = useMjStore();
const color = computed(() =>
  findDirectionForPostiion(mjStore.myPos, 3) === mjStore.currentPos ? "bg-green-5" : "bg-green-0",
);
const showHand = computed(
  () => findDirectionForPostiion(mjStore.myPos, 3) === mjStore.currentPos && mjStore.state === GameState.End,
);
</script>
