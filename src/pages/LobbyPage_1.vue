<template>
  <q-page class="column flex-center">
    <q-card class="row flex-center" style="width: 80%">
      <div class="column col-9">
        <q-card-section class="row flex-centera" v-for="room in rooms" :key="room.name">
          <q-card-section
            flat
            class="flex-center col-2 lobby"
            style="font-size: x-large"
            @click="select(room.name, PlayerPosition.East)"
          >
            {{ room.name }}
          </q-card-section>
          <q-btn
            v-for="player in room.players"
            :key="player.userName"
            class="flex-center lobby"
            @click="select(player.roomName, player.position)"
            >{{ player.userName }}</q-btn
          >
        </q-card-section>
      </div>
      <q-separator vertical color="red" />
      <div class="column flex-center">
        <div class="lobby">current selection:</div>
        <div class="lobby">{{ selectRoom + selectPos }}</div>
        <q-btn class="lobby" @click="logout" :loading="loading">Sign Out</q-btn>
        <q-btn class="lobby" @click="refreshRooms">Refresh</q-btn>
        <q-btn class="lobby" @click="operateRoom()" :disable="inRoom && !haveRoom">{{ newordelete }}</q-btn>
        <q-btn class="lobby" @click="joinorleaveRoom()" :disable="haveRoom && inRoom">{{ joinorleave }}</q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import {
  sendCreateRoom,
  sendDeleteRoom,
  sendJoinRoom,
  sendLeaveRoom,
  sendListRoom,
  sendSignout,
} from "src/websocket/client.api";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user-store";
import { RoomModel } from "src/common/models/room.model";
import { PlayerPosition } from "src/common/models/common.types";
import { wait } from "src/core/timer";

const router = useRouter();
const selectRoom = ref("None");
const selectPos = ref(PlayerPosition.East);
const currentRoom = ref("None");
const currentPos = ref<PlayerPosition>(PlayerPosition.East);
const rooms = ref([] as RoomModel[]);
const userStore = useUserStore();
const haveRoom = ref(false);
const loading = ref(false);

const inRoom = computed(() => {
  return currentRoom.value != "None";
});

const newordelete = computed(() => {
  if (haveRoom.value) {
    return "Delete Room";
  }
  return "New Room";
});

const joinorleave = computed(() => {
  if (currentRoom.value == "None") {
    return "Join Room";
  }
  return "Leave Room";
});

async function refreshRooms() {
  const response = await sendListRoom();
  rooms.value = [];
  for (const room of response.data) {
    rooms.value.push(room);
  }
  console.log("refresh room");
}
async function logout() {
  const response = await sendSignout();
  loading.value = true;
  await wait(2000);
  if (haveRoom.value) {
    operateRoom();
  }
  if (response.status == "success") {
    console.log("logout success");
    userStore.user = null;
    router.push("/login");
  }
  loading.value = false;
}

async function operateRoom() {
  if (haveRoom.value) {
    const temp = currentRoom.value;
    joinorleaveRoom();
    const response = await sendDeleteRoom(temp);
    if (response.status == "success") {
      console.log("delete room success");
      haveRoom.value = false;
      refreshRooms();
    }
  } else {
    const roomName = await prompt("Enter room name");
    if (!roomName) {
      return;
    }
    console.log("create room");
    const response = await sendCreateRoom(roomName);
    if (response.status == "success") {
      console.log("create room success");
      haveRoom.value = true;
      selectRoom.value = roomName;
      selectPos.value = PlayerPosition.East;
      joinorleaveRoom();
      refreshRooms();
    }
  }
}

async function joinorleaveRoom() {
  if (currentRoom.value == "None") {
    const response = await sendJoinRoom(selectRoom.value, selectPos.value);
    if (response.status == "success") {
      currentRoom.value = selectRoom.value;
      currentPos.value = selectPos.value;
      console.log("join room success");
    }
  } else {
    const response = await sendLeaveRoom(currentRoom.value);
    if (response.status == "success") {
      currentRoom.value = "None";
      selectRoom.value = "None";
      console.log("leave room success");
    }
  }
  refreshRooms();
}

function select(roomName: string, position: PlayerPosition) {
  selectRoom.value = roomName;
  selectPos.value = position;
}

refreshRooms();
</script>

<style>
.lobby {
  flex: 1;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: medium;
  font-weight: 500;
  cursor: pointer; /* Optional: for a clickable effect */
  padding: 10px; /* Optional: adjust padding to fit your design */
  margin: 3px; /* Optional: add margin between items */
  border-radius: 5px;
}
</style>
