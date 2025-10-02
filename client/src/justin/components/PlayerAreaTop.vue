<template>
  <div :class="['column flex-center area-player', color]">
    <div class="row reverse flex-center">
      <comp-tile
        v-for="(tile, index) in mjStore.handTileTop"
        :key="index"
        :type="IDtoName(tile)"
        position="top"
        size="large"
        :back="!showHand"
      />
      <comp-tile type="" position="top" />
      <comp-tile :type="IDtoName(mjStore.newTileTop)" position="top" size="large" :back="!showHand" />
      <div
        class="row reverse flex-center"
        v-for="(row, rowIndex) in mjStore.meldsTop"
        :key="rowIndex"
        style="display: flex"
      >
        <comp-tile type="" position="top" />

        <comp-tile
          v-for="(tile, colIndex) in row.tiles"
          :key="`${rowIndex}-${colIndex}`"
          :type="IDtoName(tile)"
          position="top"
          size="large"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaTop",
});

import CompTile from "src/justin/components/CompTile.vue";
import { useMjStore } from "src/justin/stores/mj-store";
import { computed } from "vue";
import { findDirectionForPostiion, IDtoName } from "../common/common";
import { GameState } from "src/common/core/mj.game";

const color = computed(() =>
  findDirectionForPostiion(mjStore.myPos, 2) === mjStore.currentPos ? "bg-green-5" : "bg-green-0",
);
const showHand = computed(
  () => findDirectionForPostiion(mjStore.myPos, 2) === mjStore.currentPos && mjStore.state === GameState.End,
);

const mjStore = useMjStore();
</script>
