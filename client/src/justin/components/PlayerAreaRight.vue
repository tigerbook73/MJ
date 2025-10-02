<template>
  <div :class="['column flex-center area-player', color]">
    <div class="row reverse-wrap flex-center w-5">
      <comp-tile
        v-for="(tile, index) in mjStore.handTileRight"
        :key="index"
        :type="IDtoName(tile)"
        position="right"
        size="large"
        :back="!showHand"
      />
      <comp-tile type="" position="right" />
      <comp-tile :type="IDtoName(mjStore.newTileRight)" position="right" size="large" :back="!showHand" />
      <div
        class="row reverse-wrap flex-center w-5"
        v-for="(row, rowIndex) in mjStore.meldsRight"
        :key="rowIndex"
        style="display: flex"
      >
        <comp-tile type="" position="right" />

        <comp-tile
          v-for="(tile, colIndex) in row.tiles"
          :key="`${rowIndex}-${colIndex}`"
          :type="IDtoName(tile)"
          position="right"
          size="large"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PlayerAreaRight",
});
import CompTile from "src/justin/components/CompTile.vue";
import { useMjStore } from "src/justin/stores/mj-store";
import { computed } from "vue";
import { findDirectionForPostiion, IDtoName } from "../common/common";
import { GameState } from "src/common/core/mj.game";

const color = computed(() =>
  findDirectionForPostiion(mjStore.myPos, 1) === mjStore.currentPos ? "bg-green-5" : "bg-green-0",
);
const showHand = computed(
  () => findDirectionForPostiion(mjStore.myPos, 1) === mjStore.currentPos && mjStore.state === GameState.End,
);

const mjStore = useMjStore();
</script>
