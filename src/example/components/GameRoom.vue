<template>
  <div class="fit flex column bg-blue-3 text-center">
    <!-- top -->
    <div class="row col-3">
      <q-space />
      <GamePlayer v-if="northPlayer" :player="northPlayer" class="col-6" @click="handlePlayerClick(northPlayer)" />
      <q-space />
    </div>

    <!-- middle -->
    <div class="row col-6">
      <!-- left -->
      <GamePlayer v-if="westPlayer" :player="westPlayer" class="col-3" @click="handlePlayerClick(westPlayer)" />

      <!-- center -->
      <div class="col-6 column flex-center bg-green-3">
        {{ props.room.name }}
        <q-btn class="q-mt-sm" color="primary" label="Join" @click="handleEnterGame" />
      </div>

      <!-- right -->
      <GamePlayer v-if="eastPlayer" :player="eastPlayer" class="col-3" @click="handlePlayerClick(eastPlayer)" />
    </div>

    <!-- bottom -->
    <div class="row col-3">
      <q-space />
      <GamePlayer v-if="southPlayer" :player="southPlayer" class="col-6" @click="handlePlayerClick(southPlayer)" />
      <q-space />
    </div>
  </div>
</template>

<script lang="ts">
export interface GameRoomProp {
  name: RoomModel["name"];
  state: RoomModel["state"];
  players: RoomModel["players"];
}
</script>

<script setup lang="ts">
import GamePlayer, { GamePlayerProp } from "./GamePlayer.vue";
import { AppState, useExampleStore } from "../stores/example-store";
import { RoomModel } from "src/common/models/room.model";
import { Position } from "src/common/core/mj.game";
import { computed } from "vue";

const exampleStore = useExampleStore();

const props = defineProps<{
  room: GameRoomProp;
}>();

const southPlayer = computed(() => props.room.players.find((player) => player.position === Position.South) || null);
const eastPlayer = computed(() => props.room.players.find((player) => player.position === Position.East) || null);
const westPlayer = computed(() => props.room.players.find((player) => player.position === Position.West) || null);
const northPlayer = computed(() => props.room.players.find((player) => player.position === Position.North) || null);

function handlePlayerClick(player: GamePlayerProp) {
  console.log(`Player [${player.userName}] at position [${player.position}] in room [${props.room.name}] clicked`);
}

function handleEnterGame() {
  exampleStore.appState = AppState.InGame;
}
</script>
