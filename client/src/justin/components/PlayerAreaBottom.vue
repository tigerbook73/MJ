<template>
  <div :class="['column flex-center area-player', 'bg-green-0']">
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in mjStore.handTileBottom"
        :key="index"
        :type="mjStore.IDtoName(tile)"
        :selected="mjStore.showSelected(tile)"
        @click="onClick(tile)"
        position="bottom"
        size="large"
      />
      <comp-tile type="" />
      <comp-tile
        :type="mjStore.IDtoName(mjStore.newTileBottom)"
        :selected="mjStore.showSelected(mjStore.newTileBottom)"
        @click="onClick(mjStore.newTileBottom)"
        position="bottom"
        size="large"
      />

      <div v-for="(row, rowIndex) in mjStore.meldsBottom" :key="rowIndex" style="display: flex">
        <comp-tile type="" />

        <comp-tile
          v-for="(tile, colIndex) in row.tiles"
          :key="`${rowIndex}-${colIndex}`"
          :type="mjStore.IDtoName(tile)"
          position="bottom"
          size="large"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PlayerAreaBottom" });

import CompTile from "src/justin/components/CompTile.vue";
import type { TileId } from "@common/core/mj.tile-core";
import { useMjStore } from "src/justin/stores/mj-store";

const mjStore = useMjStore();

function onClick(tile: TileId) {
  //
  mjStore.selectTile(tile);
}
</script>
