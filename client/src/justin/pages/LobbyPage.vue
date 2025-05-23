<template>
  <q-page class="q-pa-md column flex-center bg-blue-grey-5">
    <div class="row" style="width: 80%; min-height: 500px">
      <q-card class="q-pa-md col-5 row flex-center bg-green-2" style="align-items: start">
        <div class="q-pa-md column flex-center" style="width: 80%; margin: 5px; align-items: start">
          <!-- <LobbyDiv
            v-for="(room, index) in rooms"
            :key="index"
            :room="room"
            @selected="(player) => handleSelected(room, player)"
          /> -->
          <div
            class="row fit q-pa-md room-hover"
            style="font-size: x-large; font-weight: 500; cursor: pointer"
            v-for="(room, index) in rooms"
            :key="index"
            :roomname="room.name"
            @dblclick="selectRoom(room, index)"
            :class="{ current: room.name === selectedRoom?.name && in_room }"
          >
            {{ room.name }}
          </div>
        </div>
      </q-card>
      <q-card class="col-7 q-pa-md column flex-center bg-green-1">
        <div class="q-pa-sm row flex-center bg-blue-1" style="height: 50%; width: 100%">
          <div class="row col-4 flex-center" style="">
            <div
              class="row flex-center q-pa-md"
              style="font-size: x-large; font-weight: 500"
              @dblclick="selectPos(Position.North)"
              :class="{ selected: Position.North === selectedPos }"
            >
              North {{ rooms[roomNumber]?.players[Position.North]?.name }}
            </div>
          </div>
          <div class="column col-4 flex-center">
            <div
              class="row flex-center q-pa-md"
              style="font-size: x-large; font-weight: 500"
              @dblclick="selectPos(Position.West)"
              :class="{ selected: Position.West === selectedPos }"
            >
              West {{ rooms[roomNumber].players[Position.West].name }}
            </div>

            <div
              class="row flex-center q-pa-md"
              style="font-size: x-large; font-weight: 500"
              @dblclick="selectPos(Position.East)"
              :class="{ selected: Position.East === selectedPos }"
            >
              East {{ rooms[roomNumber].players[Position.East].name }}
            </div>
          </div>
          <div class="row col-4 flex-center">
            <div
              class="row flex-center q-pa-md"
              style="font-size: x-large; font-weight: 500"
              @dblclick="selectPos(Position.South)"
              :class="{ selected: Position.South === selectedPos }"
            >
              South {{ rooms[roomNumber].players[Position.South].name }}
            </div>
          </div>
        </div>
        <div class="q-pa-sm column flex-center" style="flex: auto">
          <div class="row flex-center" style="font-weight: bold; font-size: large">
            current room: {{ currentRoom?.name }} pos: {{ currentPos }}
          </div>
          <div class="row flex-center" style="font-weight: bold; font-size: x-large">{{ selected }}</div>
          <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold" @click="logout"
            >Sign Out</q-btn
          >
          <q-btn
            flat
            class="q-pa-sm flex-center bg-white"
            style="font-size: large; font-weight: bold"
            @click="enterGame"
            >EnterGame</q-btn
          >
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import type { RoomProp } from "src/justin/components/LobbyDiv.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Position } from "src/common/core/mj.game";
import { clientApi } from "src/client/client-api";
import { setGame } from "src/core/mjGame";
import { useMjStore } from "src/justin/stores/mj-store";
import type { RoomModel } from "src/common/models/room.model";

const router = useRouter();
const mjStore = useMjStore();

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const selectedRoom = ref<RoomProp | null>(null);
const selectedPos = ref<Position | null>(null);
const roomNumber = ref(0);

const temp = ref<number | null>(null);

const selected = ref({ roomname: "", pos: Position.East | -1 });
const currentRoom = ref<RoomModel | null>(null);
const currentPos = ref<Position | null>(Position.East);
// const display = ref("null");
const in_room = ref(false);

// const handleSelected = (room: RoomProp, player: MyPlayer) => {
//   display.value = `room: ${player.name} position: ${player.pos}`;
//   selected.value.roomname = room.name;
//   selected.value.pos = player.pos;
//   if (!in_room.value) {
//     joinRoom();
//   } else {
//     leaveRoom();
//   }
// };

const rooms = computed(() => {
  return mjStore.roomList.map((room) => ({
    name: room.name,
    players: room.players.map((player) => ({
      name: player.userName,
      pos: player.position,
    })),
  }));
});

function selectRoom(room: RoomProp, index: number) {
  if (!in_room.value) {
    in_room.value = true;
    selectedRoom.value = room;
    roomNumber.value = index;
  } else if (room.name === currentRoom.value?.name) {
    in_room.value = false;
    selectedRoom.value = null;
    roomNumber.value = 0;
  } else {
    selectedRoom.value = room;
    temp.value = index;
    roomNumber.value = index;
  }
}

function selectPos(pos: Position) {
  if (pos != selectedPos.value) {
    joinRoom();
    selectedPos.value = pos;
    selected.value.pos = pos;
  } else {
    leaveRoom();
    selectedPos.value = null;
    selected.value.pos = -1;
  }
}

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
    if (!selectedRoom.value || !selectedPos.value) {
      window.alert("Please select a room and position first");
      window.alert("Please select a room first");
      return;
    }
    const room = await clientApi.joinRoom(selectedRoom.value.name, selectedPos.value);
    currentRoom.value = room;
    currentRoom.value.players = room.players;
    currentPos.value = selected.value.pos;
    in_room.value = true;
  } catch {
    window.alert("join room failed");
  }
}

async function leaveRoom() {
  try {
    if (!currentRoom.value) {
      window.alert("Please select a room first");
      return;
    }
    await clientApi.leaveRoom(currentRoom.value.name);
    in_room.value = false;
    selected.value.roomname = "";
    currentRoom.value = null;
    currentPos.value = null;
  } catch {
    window.alert("leave room failed");
  }
}

async function enterGame() {
  try {
    if (!currentRoom.value) {
      window.alert("Please select a room first");
      return;
    }
    const data = await clientApi.enterGame(currentRoom.value.name);
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

<style scoped>
.room-hover {
  transition: background-color 0.2s;
}
.room-hover:hover {
  background-color: lightblue; /* light green */
  color: black;
}

.current {
  background-color: lightcoral;
  color: black;
}
</style>
