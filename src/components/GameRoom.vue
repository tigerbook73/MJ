<template>
  <q-card class="room column">
    <!-- Top (North) -->
    <div class="col-3">
      <div class="row full-height">
        <div class="col-3"></div>
        <q-btn
          no-caps
          flat
          class="col-6 bg-blue-4"
          :label="northPlayer?.name"
          @click="joinRoom(PlayerPosition.North)"
          :disable="isJoined || isPositionOccupied('North')"
        ></q-btn>
        <div class="col-3"></div>
      </div>
    </div>

    <!-- Center (West, Room Name, East) -->
    <div class="col-6">
      <div class="row full-height">
        <q-btn
          no-caps
          flat
          class="col-3 bg-blue-4"
          :label="westPlayer?.name"
          @click="joinRoom(PlayerPosition.West)"
          :disable="isJoined || isPositionOccupied('West')"
        ></q-btn>
        <div class="col-6 bg-green-4 row flex-center">
          <div>{{ roomName }}</div>
        </div>
        <q-btn
          no-caps
          flat
          class="col-3 bg-blue-4"
          :label="eastPlayer?.name"
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
          no-caps
          flat
          class="col-6 bg-blue-4"
          :label="southPlayer?.name"
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
import { computed } from "vue";
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

const northPlayer = computed(() => {
  return props.players.find((p) => p.position === PlayerPosition.North);
});

const southPlayer = computed(() => {
  return props.players.find((p) => p.position === PlayerPosition.South);
});

const westPlayer = computed(() => {
  return props.players.find((p) => p.position === PlayerPosition.West);
});

const eastPlayer = computed(() => {
  return props.players.find((p) => p.position === PlayerPosition.East);
});
// const router = useRouter();

function isPositionOccupied(position: string): boolean {
  return props.players.some((p) => p.position === position);
}

async function joinRoom(position: PlayerPosition) {
  try {
    // Make the socket request to join the room
    const response = await socketJoinRoomAndWaitAck(props.roomName, position);

    if (response.status === "success") {
      emits("update");
    } else {
      alert(`Failed to join room: ${response.message}`);
    }
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
