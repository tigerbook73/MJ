<template>
  <div>
    <!-- for each position -->
    <div v-for="(position, wallIndex) in ['EAST', 'SOUTH', 'WEST', 'NORTH']" :key="wallIndex">
      <!-- position -->
      <div>{{ position }}</div>
      <div class="q-mx-lg">
        <!-- wall tiles -->
        <div class="row q-mx-sm">
          <div class="tag">Wall</div>
          <div class="tile-raw row items-center">
            <div
              v-for="(tile, index) in props.game?.walls[wallIndex].tiles"
              :key="index"
              :class="{ tile: tile !== -1, 'void-tile': tile === -1 }"
            >
              <div>{{ tile == -1 ? "" : tile }}</div>
              <div>{{ TileCore.fromId(tile).name }}</div>
            </div>
          </div>
        </div>

        <!-- discard tiles -->
        <div v-if="props.game?.players[wallIndex]" class="row q-mx-sm items-center">
          <div class="tag">Discards</div>
          <div class="tile-row row items-center">
            <div v-for="(tile, index) in props.game?.discards[wallIndex].tiles" :key="index" class="tile">
              <div>{{ tile }}</div>
              <div>{{ TileCore.fromId(tile).name }}</div>
            </div>
          </div>
        </div>

        <!-- hand tiles -->
        <div v-if="props.game?.players[wallIndex]" class="row q-mx-sm items-center">
          <div class="tag">Hand</div>
          <div class="tile-row row items-center">
            <div
              v-for="(tile, index) in props.game?.players[wallIndex]?.handTiles"
              :key="index"
              class="tile"
              @dblclick="handleDrop(tile)"
            >
              <div>{{ tile }}</div>
              <div>{{ TileCore.fromId(tile).name }}</div>
            </div>
          </div>
        </div>

        <!-- picked -->
        <div v-if="props.game?.players[wallIndex]" class="row q-mx-sm items-center">
          <div class="tag">Picked</div>
          <div class="tile-row row items-center">
            <div
              v-if="props.game?.players[wallIndex]?.picked"
              class="tile"
              @dblclick="handleDrop(props.game?.players[wallIndex]?.picked)"
            >
              <div>{{ props.game?.players[wallIndex]?.picked }}</div>
              <div>{{ TileCore.fromId(props.game?.players[wallIndex]?.picked || -1).name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Game } from "src/common/core/mj.game";
import { TileCore, TileId } from "src/common/core/mj.tile-core";

const props = defineProps<{
  game: Game | null;
}>();

const emits = defineEmits<{
  (event: "drop", value: TileId): void;
}>();

function handleDrop(tile?: TileId) {
  if (tile !== undefined) {
    emits("drop", tile);
  }
}
</script>

<style scoped>
.tile {
  width: 23px;
  min-height: 38px;
  text-align: center;
  border: 1px solid black;
  font-size: x-small;
  font-weight: bold;
  cursor: pointer;
  margin-right: 2px;
}

.void-tile {
  width: 23px;
  min-height: 38px;
  text-align: center;
  /* border: 1px solid black; */
  font-size: x-small;
  font-weight: bold;
  margin-right: 2px;
}

.tile:hover {
  background-color: black;
  border-color: #888;
  color: white;
}

.tile-row {
  min-height: 40px;
}

.tag {
  width: 80px;
}
</style>
