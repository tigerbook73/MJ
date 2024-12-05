<template>
  <q-card class="room column">
    <!-- Top (North) -->
    <div class="col-3">
      <div class="row full-height">
        <div class="col-3"></div>
        <q-btn
          flat
          class="col-6 bg-blue-4"
          :label="getPlayerName('North')"
          @click="joinRoom()"
          :disable="isJoined || isPositionOccupied('North')"
        ></q-btn>
        <div class="col-3"></div>
      </div>
    </div>

    <!-- Center (West, Room Name, East) -->
    <div class="col-6">
      <div class="row full-height">
        <q-btn
          flat
          class="col-3 bg-blue-4"
          :label="getPlayerName('West')"
          @click="joinRoom(PlayerPosition.West)"
          :disable="isJoined || isPositionOccupied('West')"
        ></q-btn>
        <div class="col-6 bg-green-4 row flex-center">
          <div>{{ roomName }}</div>
        </div>
        <q-btn
          flat
          class="col-3 bg-blue-4"
          :label="getPlayerName('East')"
          @click="joinRoom(PlayerPosition.East)"
          :disable="isJoined || isPositionOccupied('East')"
        ></q-btn>
      </div>
    </div>

    <!-- Bottom (South) -->
    <div class="col-3">
      <div class="row full-height">
        <div class="col-3"></div>
        <q-btn
          flat
          class="col-6 bg-blue-4"
          :label="getPlayerName('South')"
          @click="joinRoom(PlayerPosition.South)"
          :disable="isJoined || isPositionOccupied('South')"
        ></q-btn>
        <div class="col-3"></div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { PlayerPosition } from "src/common/models/common.types";
import { socketJoinRoomAndWaitAck } from "src/websocket/client.api";
// import { useRouter } from "vue-router";

interface Props {
  roomName: string;
  isJoined?: boolean;
  players: { name: string; position: string; type: string }[];
}

const props = withDefaults(defineProps<Props>(), {
  roomName: "",
  isJoined: false,
  players: () => [],
});

const emits = defineEmits(["update"]);

// const router = useRouter();

function getPlayerName(position: string): string {
  const player = props.players.find((p) => p.position === position);
  return player ? player.name : "Player";
}

function isPositionOccupied(position: string): boolean {
  return props.players.some((p) => p.position === position);
}

async function joinRoom(position: PlayerPosition = PlayerPosition.North) {
  // if (props.isJoined || isPositionOccupied(position)) return;

  try {
    await socketJoinRoomAndWaitAck(props.roomName, position);
    emits("update");
  } catch (error) {
    console.error("Error joining room:", error);
    alert("An error occurred while trying to join the room.");
  }
}
</script>

<style lang="scss">
.room {
  width: 400px;
  height: 400px;
  background-color: white;
}
</style>
