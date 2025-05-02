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
import { useExampleStore } from "../stores/example-store";
import { RoomModel } from "src/common/models/room.model";
import { Position } from "src/common/core/mj.game";
import { computed } from "vue";
import { clientApi } from "src/client/client-api";
import { useQuasar } from "quasar";
import { UserType } from "src/common/models/common.types";

const exampleStore = useExampleStore();
const $q = useQuasar();

const props = defineProps<{
  room: GameRoomProp;
}>();

const southPlayer = computed(() => props.room.players.find((player) => player.position === Position.South) || null);
const eastPlayer = computed(() => props.room.players.find((player) => player.position === Position.East) || null);
const westPlayer = computed(() => props.room.players.find((player) => player.position === Position.West) || null);
const northPlayer = computed(() => props.room.players.find((player) => player.position === Position.North) || null);

function handlePlayerClick(player: GamePlayerProp) {
  // alread at the position
  if (exampleStore.currentRoom?.name == props.room.name && exampleStore.currentPosition === player.position) {
    try {
      clientApi.leaveRoom(props.room.name);
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to leave room",
      });
    }
    return;
  }

  // position is available
  if (player.type === UserType.Bot) {
    if (exampleStore.currentPosition) {
      try {
        clientApi.leaveRoom(exampleStore.currentRoom!.name);
      } catch (error) {
        $q.notify({
          type: "negative",
          message: "Failed to leave current room",
        });
        return;
      }
    }

    try {
      clientApi.joinRoom(props.room.name, player.position);
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to join room",
      });
    }
  }

  if (exampleStore.currentPosition !== player.position && player.type !== UserType.Bot) {
    try {
      clientApi.leaveRoom(props.room.name);
      clientApi.joinRoom(props.room.name, player.position);
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to leave room",
      });
    }
    return;
  }
}

function handleEnterGame() {
  try {
    clientApi.enterGame(props.room.name);
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Failed to enter game",
    });
  }
}
</script>
