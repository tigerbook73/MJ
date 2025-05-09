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
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold" @click="enterGame"
          >EnterGame</q-btn
        >
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import LobbyDiv, { MyPlayer, RoomProp } from "src/justin/components/LobbyDiv.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Position } from "src/common/core/mj.game";
import { clientApi } from "src/client/client-api";
import { setGame } from "src/core/mjGame";
import { useMjStore } from "src/justin/stores/mj-store";

const router = useRouter();
const mjStore = useMjStore();

const selected = ref({ roomname: "", pos: Position.East });
const currentRoom = ref("");
const currentPos = ref(Position.East);
const display = ref("null");
const in_room = ref(false);

const handleSelected = (room: RoomProp, player: MyPlayer) => {
  display.value = `room: ${player.name} position: ${player.pos}`;
  selected.value.roomname = room.name;
  selected.value.pos = player.pos;
  if (!in_room.value) {
    joinRoom();
  } else {
    leaveRoom();
  }
};

const rooms = computed(() => {
  return mjStore.roomList.map((room) => ({
    name: room.name,
    players: room.players.map((player) => ({
      name: player.userName,
      pos: player.position,
    })),
  }));
});

async function logout() {
  try {
    await clientApi.signOut();
    router.push("/justin/login");
  } catch (error: any) {
    window.alert(error.message);
  }
}

async function joinRoom() {
  try {
    const room = await clientApi.joinRoom(selected.value.roomname, selected.value.pos);
    currentRoom.value = room.name;
    currentPos.value = selected.value.pos;
    in_room.value = true;
  } catch (error: any) {
    window.alert("join room failed");
  }
}

async function leaveRoom() {
  try {
    await clientApi.leaveRoom(currentRoom.value);
    in_room.value = false;
    selected.value.roomname = "";
  } catch (error: any) {
    window.alert("leave room failed");
  }
}

async function enterGame() {
  try {
    const data = await clientApi.enterGame(currentRoom.value);
    if (data.game) {
      setGame(data.game);
      mjStore.refresh();
    }
    router.push("/justin/game");
  } catch (error: any) {
    window.alert(error.message);
  }
}
</script>
