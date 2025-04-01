<template>
  <q-page class="q-pa-md column flex-center bg-blue-grey-5">
    <q-card class="q-pa-md row flex-center bg-green-1" style="width: 80%; min-height: 500px; flex: 1">
      <div class="q-pa-md row flex-center" style="width: 70%; margin: 5px">
        <LobbyDiv
          v-for="(room, index) in rooms"
          :key="index"
          :room="room"
          @selected="(player) => handleSelected(room, player)"
        />
      </div>
      <q-separator vertical color="grey-8" />
      <div class="q-pa-sm column flex-center" style="flex: auto">
        <div class="row flex-center" style="font-weight: bold; font-size: large">current selection:</div>
        <div class="row flex-center" style="font-weight: bold; font-size: x-large">{{ selected }}</div>
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold" @click="logout"
          >Sign Out</q-btn
        >
        <q-btn
          flat
          class="q-pa-sm flex-center bg-white"
          style="font-size: large; font-weight: bold"
          @click="refreshRoom"
          >Refresh</q-btn
        >
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold" @click="createRoom"
          >New Room</q-btn
        >
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold" @click="deleteRoom"
          >Delete Room</q-btn
        >
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold" @click="joinRoom"
          >Join</q-btn
        >
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold" @click="leaveRoom"
          >Leave</q-btn
        >
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold" @click="enterGame"
          >EnterGame</q-btn
        >
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import LobbyDiv, { MyPlayer, RoomProp } from "src/components/LobbyDiv.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Position } from "src/common/core/mj.game";
import { clientApi } from "src/client/client-api";
import { setGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";

const router = useRouter();
const MjStore = useMjStore();

const selected = ref({ roomname: "", pos: Position.East });
const display = ref("null");

const handleSelected = (room: RoomProp, player: MyPlayer) => {
  display.value = `room: ${player.name} position: ${player.pos}`;
  selected.value.roomname = room.name;
  selected.value.pos = player.pos;
};

const rooms = ref<RoomProp[]>([]);
async function refreshRoom() {
  rooms.value = (await clientApi.listRoom()).map((room) => ({
    name: room.name,
    players: room.players.map((player) => ({
      name: player.userName,
      pos: player.position,
    })),
  }));
}

refreshRoom();

async function logout() {
  try {
    await clientApi.signOut();
    router.push("/login");
  } catch (error: any) {
    window.alert("logout failed");
  }
}

async function createRoom() {
  try {
    const room = await clientApi.createRoom(selected.value.roomname);
    selected.value = { pos: Position.East, roomname: room.name };
  } catch (error: any) {
    window.alert("create room failed");
  }
}
async function deleteRoom() {
  try {
    await clientApi.deleteRoom(selected.value.roomname);
  } catch (error: any) {
    window.alert("delete room failed");
  }
}

async function joinRoom() {
  try {
    const room = await clientApi.joinRoom(selected.value.roomname, selected.value.pos);
    selected.value.roomname = room.name;
  } catch (error: any) {
    window.alert("join room failed");
  }
}
async function leaveRoom() {
  try {
    await clientApi.leaveRoom(selected.value.roomname);
  } catch (error: any) {
    window.alert("leave room failed");
  }
}

async function enterGame() {
  try {
    const data = await clientApi.enterGame(selected.value.roomname);
    if (data.game) {
      setGame(data.game);
      MjStore.refresh();
    }
    router.push("/game");
  } catch (error: any) {
    window.alert("enter game failed");
  }
}
</script>
