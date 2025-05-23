<template>
  <div class="fit flex column bg-blue-3 text-center">
    <!-- top -->
    <div class="row col-3">
      <q-space />
      <game-seat
        v-if="northPlayer"
        :player="northPlayer"
        class="col-6"
        @dblclick.stop="handlePlayerClick(northPlayer)"
      />
      <q-space />
    </div>

    <!-- middle -->
    <div class="row col-6">
      <!-- left -->
      <game-seat v-if="westPlayer" :player="westPlayer" class="col-3" @dblclick.stop="handlePlayerClick(westPlayer)" />

      <!-- center -->
      <div class="col-6 column flex-center bg-green-3" :class="{ 'bg-yellow-3': props.room.state !== RoomStatus.Open }">
        <q-chip size="1rem" square>{{ props.room.name }}</q-chip>
        <q-btn
          v-if="props.room.state === RoomStatus.Open"
          :disable="props.room.name !== exampleStore.currentRoom?.name"
          label="Enter Game"
          color="secondary"
          class="q-mt-md"
          :loading="loading"
          @click="handleEnterGame"
        />
        <q-chip v-else size="1rem" square>Playing ...</q-chip>
      </div>

      <!-- right -->
      <game-seat v-if="eastPlayer" :player="eastPlayer" class="col-3" @dblclick.stop="handlePlayerClick(eastPlayer)" />
    </div>

    <!-- bottom -->
    <div class="row col-3">
      <q-space />
      <game-seat
        v-if="southPlayer"
        :player="southPlayer"
        class="col-6"
        @dblclick.stop="handlePlayerClick(southPlayer)"
      />
      <q-space />
    </div>

    <!-- loading -->
    <q-inner-loading color="primary" :showing="loading"> </q-inner-loading>
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
import type { GameSeatProp } from "./GameSeat.vue";
import GameSeat from "./GameSeat.vue";
import { useExampleStore } from "../stores/example-store";
import type { RoomModel } from "@mj/shared/common/models/room.model";
import { RoomStatus } from "@mj/shared/common/models/room.model";
import { Position } from "@mj/shared/common/core/mj.game";
import { computed, ref } from "vue";
import { clientApi } from "src/client/client-api";
import { useQuasar } from "quasar";
import { UserType } from "@mj/shared/common/models/common.types";

const exampleStore = useExampleStore();
const $q = useQuasar();

const props = defineProps<{
  room: GameRoomProp;
}>();

const southPlayer = computed(() => props.room.players.find((player) => player.position === Position.South) || null);
const eastPlayer = computed(() => props.room.players.find((player) => player.position === Position.East) || null);
const westPlayer = computed(() => props.room.players.find((player) => player.position === Position.West) || null);
const northPlayer = computed(() => props.room.players.find((player) => player.position === Position.North) || null);

async function handlePlayerClick(player: GameSeatProp) {
  if (props.room.state !== RoomStatus.Open) {
    return;
  }

  // already at the position
  if (exampleStore.currentRoom?.name == props.room.name && exampleStore.currentPosition === player.position) {
    try {
      await clientApi.leaveRoom(props.room.name);
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to leave room",
      });
    }
    return;
  }

  // position is occupied
  if (player.type === UserType.Human) {
    $q.notify({
      type: "negative",
      message: "Seat is occupied",
    });
    return;
  }

  // position is available
  if (player.type === UserType.Bot) {
    if (exampleStore.currentPosition !== null) {
      // if the player is currently in a room, leave it
      try {
        await clientApi.leaveRoom(exampleStore.currentRoom!.name);
      } catch (error) {
        $q.notify({
          type: "negative",
          message: "Failed to leave current room",
        });
        return;
      }
    }

    // join the new room
    try {
      await clientApi.joinRoom(props.room.name, player.position);
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to join room",
      });
    }
    return;
  }
}

const loading = ref(false);
async function handleEnterGame() {
  if (!exampleStore.currentRoom) {
    $q.notify({
      type: "negative",
      message: "Please join a room first",
    });
    return;
  }
  try {
    loading.value = true;
    await clientApi.enterGame(props.room.name);
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Failed to enter game",
    });
  } finally {
    loading.value = false;
  }
}
</script>
