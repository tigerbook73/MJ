<template>
  <q-page class="column flex-center">
    <q-card class="row flex-center" style="width: 80%">
      <div class="column">
        <q-card-section class="column flex-center" v-for="room in rooms" :key="room.name">
          {{ room.name }}
          <q-btn
            v-for="player in room.players"
            :key="player.userName"
            class="flex-center"
            @click="select(player.roomName, player.position)"
            >{{ player.userName }}</q-btn
          >
        </q-card-section>
      </div>
      <q-separator vertical color="red" />
      <div class="column flex-center">
        <div>current selection:</div>
        <div>{{ currentSelection }}</div>
        <q-btn @click="logout">Sign Out</q-btn>
        <q-btn @click="refreshRooms">Refresh</q-btn>
        <q-btn @click="creatRoom('abc')">New/Delete Room</q-btn>
        <q-btn @click="joinRoom()">Join</q-btn>
        <q-btn @click="leaveRoom()">Leave</q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { sendDeleteRoom, sendJoinRoom, sendListRoom, sendSignout } from "src/websocket/client.api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user-store";
import { RoomModel } from "src/common/models/room.model";
import { PlayerPosition } from "src/common/models/common.types";

const router = useRouter();
const currentSelection = ref("None");
const currentRoom = ref("None");
const currentPos = ref<PlayerPosition>(PlayerPosition.East);
const rooms = ref([] as RoomModel[]);
const haveRoom = ref(false);

async function refreshRooms() {
  const response = await sendListRoom();
  rooms.value = [];
  for (const room of response.data) {
    rooms.value.push(room);
  }
}

async function logout() {
  const response = await sendSignout();
  const userStore = useUserStore();
  if (response.status == "success") {
    userStore.user = null;
    router.push("/login");
  }
}

async function creatRoom(roomName: string) {
  if (haveRoom.value) {
    const response = await sendDeleteRoom(roomName);
    if (response.status == "success") {
      haveRoom.value = true;
      refreshRooms();
    }
  } else {
    const response = await sendDeleteRoom(roomName);
    if (response.status == "success") {
      haveRoom.value = false;
      refreshRooms();
    }
  }
}

async function joinRoom() {
  if (currentRoom.value) {
    const response = await sendJoinRoom(currentRoom.value, currentPos.value);
    if (response.status == "success") {
      refreshRooms();
    }
  }
}

async function leaveRoom() {
  if (currentRoom.value) {
    const response = await sendJoinRoom(currentRoom.value, currentPos.value);
    if (response.status == "success") {
      refreshRooms();
    }
  }
}

function select(roomName: string, position: PlayerPosition) {
  currentRoom.value = roomName;
  currentPos.value = position;
}

refreshRooms();
</script>
