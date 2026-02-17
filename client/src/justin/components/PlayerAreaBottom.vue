<template>
  <div :class="['column flex-center area-player', color]">
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in mjStore.idsToDiscard"
        :key="index"
        :type="IDtoName(tile)"
        position="bottom"
        size="large"
      />
    </div>
    <div class="row flex-center">
      <comp-tile
        v-for="(tile, index) in mjStore.handTileBottom"
        :key="index"
        :type="IDtoName(tile)"
        :selected="mjStore.showSelected(tile)"
        @click="onClick(tile)"
        position="bottom"
        size="large"
      />
      <comp-tile type="" />
      <comp-tile
        :type="IDtoName(mjStore.newTileBottom)"
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
          :type="IDtoName(tile)"
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
import type { TileId } from "@mj/shared";
import { useMjStore } from "src/justin/stores/mj-store";
import { computed } from "vue";
import { findDirectionForPostiion, IDtoName } from "../common/common";
import { socketClient } from "src/client/socket-client";
import { useQuasar } from "quasar";

const $q = useQuasar();
const mjStore = useMjStore();

const color = computed(() =>
  findDirectionForPostiion(mjStore.myPos, 0) === mjStore.currentPos ? "bg-green-5" : "bg-green-0",
);

function onClick(tile: TileId) {
  //
  if (mjStore.selectTile(tile)) {
    //
    discard();
  }
}

function discard() {
  try {
    if (mjStore.selectedList.length === 1) {
      socketClient.actionDrop(mjStore.selectedList[0]);
      mjStore.clearSelected();
    }
  } catch (e) {
    $q.notify({ message: "Discard tile failed", color: "negative", icon: "warning" });
    console.error("Discard tile failed", e);
  }
}
</script>
