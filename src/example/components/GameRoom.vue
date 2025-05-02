<template>
  <div class="fit flex column bg-blue-3 text-center">
    <!-- top -->
    <div class="row col-3">
      <q-space />
      <GamePlayer
        :player="props.room.players.north"
        class="col-6"
        @click="handlePlayerClick(props.room.players.north)"
      />
      <q-space />
    </div>

    <!-- middle -->
    <div class="row col-6">
      <!-- left -->
      <GamePlayer :player="props.room.players.west" class="col-3" @click="handlePlayerClick(props.room.players.west)" />

      <!-- center -->
      <div class="col-6 column flex-center bg-green-3">
        {{ props.room.name }}
        <q-btn class="q-mt-sm" color="primary" label="Join" @click="handleEnterGame" />
      </div>

      <!-- right -->
      <GamePlayer :player="props.room.players.east" class="col-3" @click="handlePlayerClick(props.room.players.east)" />
    </div>

    <!-- bottom -->
    <div class="row col-3">
      <q-space />
      <GamePlayer
        :player="props.room.players.south"
        class="col-6"
        @click="handlePlayerClick(props.room.players.south)"
      />
      <q-space />
    </div>
  </div>
</template>

<script lang="ts">
export interface GameRoomProp {
  id: number;
  name: string;
  players: {
    east: GamePlayerProp;
    west: GamePlayerProp;
    north: GamePlayerProp;
    south: GamePlayerProp;
  };
}
</script>

<script setup lang="ts">
import GamePlayer, { GamePlayerProp } from "./GamePlayer.vue";
import { AppState, useExampleStore } from "../stores/example-store";

const exampleStore = useExampleStore();

const props = defineProps<{
  room: GameRoomProp;
}>();

function handlePlayerClick(player: GamePlayerProp) {
  console.log(`Player [${player.name}] at position [${player.position}] in room [${props.room.name}] clicked`);
}

function handleEnterGame() {
  exampleStore.appState = AppState.InGame;
}
</script>
