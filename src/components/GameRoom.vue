<template>
  <q-card class="room column">
    <!-- Top (North) -->
    <div class="col-3">
      <div class="row full-height">
        <div class="col-3"></div>
        <div no-caps flat class="col-6 bg-blue-4 column flex-center area-player">
          {{ northPlayer?.name }}
          <q-menu v-model="showingMenu.North" touch-position>
            <q-list style="min-width: 100px">
              <q-item v-show="northPlayer?.type == UserType.Bot" clickable v-close-popup>
                <q-item-section @click="joinRoom(PlayerPosition.North)">Join the room</q-item-section>
              </q-item>
              <q-item v-show="northPlayer?.name == store.user?.email" clickable v-close-popup>
                <q-item-section @click="leaveRoom">Leave the room</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <div class="col-3"></div>
      </div>
    </div>

    <!-- Center (West, Room Name, East) -->
    <div class="col-6">
      <div class="row full-height">
        <!-- West -->
        <div no-caps flat class="col-3 bg-blue-4 column flex-center area-player">
          {{ westPlayer?.name }}
          <q-menu v-model="showingMenu.West" touch-position>
            <q-list style="min-width: 100px">
              <q-item v-show="westPlayer?.type == UserType.Bot" clickable v-close-popup>
                <q-item-section @click="joinRoom(PlayerPosition.West)">Join the room</q-item-section>
              </q-item>
              <q-item v-show="westPlayer?.name == store.user?.email" clickable v-close-popup>
                <q-item-section @click="leaveRoom">Leave the room</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>

        <!-- Room Name -->
        <div class="col-6 bg-green-4 row flex-center">
          <div>{{ roomName }}</div>
        </div>

        <!-- East -->
        <div no-caps flat class="col-3 bg-blue-4 column flex-center area-player">
          {{ eastPlayer?.name }}
          <q-menu v-model="showingMenu.East" touch-position>
            <q-list style="min-width: 100px">
              <q-item v-show="eastPlayer?.type == UserType.Bot" clickable v-close-popup>
                <q-item-section @click="joinRoom(PlayerPosition.East)">Join the room</q-item-section>
              </q-item>
              <q-item v-show="eastPlayer?.name == store.user?.email" clickable v-close-popup>
                <q-item-section @click="leaveRoom">Leave the room</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
    </div>

    <!-- Bottom (South) -->
    <div class="col-3">
      <div class="row full-height">
        <div class="col-3"></div>
        <div no-caps flat class="col-6 bg-blue-4 column flex-center area-player">
          {{ southPlayer?.name }}
          <q-menu v-model="showingMenu.South" touch-position>
            <q-list style="min-width: 100px">
              <q-item v-show="southPlayer?.type == UserType.Bot" clickable v-close-popup>
                <q-item-section @click="joinRoom(PlayerPosition.South)">Join the room</q-item-section>
              </q-item>
              <q-item v-show="southPlayer?.name == store.user?.email" clickable v-close-popup>
                <q-item-section @click="leaveRoom">Leave the room</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { PlayerPosition, UserType } from "src/common/models/common.types";
import { userStore } from "src/stores/user-store";
import {
  socketJoinRoomAndWaitAck,
  socketLeaveRoomAndWaitAck,
  // socketStartGameAndWaitAck,
} from "src/websocket/client.api";
import { computed, ref } from "vue";
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

const showingMenu = ref({
  North: false,
  South: false,
  East: false,
  West: false,
});

const emits = defineEmits(["update"]);

const store = userStore();

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

async function leaveRoom() {
  try {
    // Example API call to leave the room
    const response = await socketLeaveRoomAndWaitAck(props.roomName);

    if (response.status === "success") {
      emits("update"); // Notify parent to refresh the room state
    } else {
      alert(`Failed to leave room: ${response.message}`);
    }
  } catch (error) {
    console.error("Error leaving room:", error);
    alert("An error occurred while trying to leave the room.");
  }
}

// function startGame using socketStartGameAndWaitAck
// async function startGame() {
//   try {
//     const response = await socketStartGameAndWaitAck();

//     if (response.status === "success") {
//       // router.push("/game");
//     } else {
//       alert(`Failed to start game: ${response.message}`);
//     }
//   } catch (error) {
//     console.error("Error starting game:", error);
//     alert("An error occurred while trying to start the game.");
//   }
// }
</script>

<style lang="scss">
.room {
  width: 400px;
  height: 400px;
  background-color: white;
}
</style>
