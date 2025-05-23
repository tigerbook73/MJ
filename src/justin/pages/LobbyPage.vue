<template>
  <q-page class="q-pa-md column flex-center bg-blue-grey-5">
    <div class="row" style="width: 80%; min-height: 500px">
      <q-card class="q-pa-md col-5 row flex-center bg-green-2" style="align-items: start">
        <div
          class="q-pa-md column flex-center"
          style="width: 80%; margin: 5px; align-items: start; font-size: x-large; font-weight: 800"
        >
          Room List
          <div
            class="row fit q-pa-md"
            style="font-size: x-large; font-weight: 500; cursor: pointer"
            v-for="(room, index) in rooms"
            :key="index"
            :roomname="room.name"
            @click="selectRoom(room, index)"
            :class="{ current: room.name === selectedRoom?.name && in_room }"
          >
            {{ room.name }}
          </div>
        </div>
      </q-card>
      <q-card class="col-7 q-pa-md column flex-center bg-green-1">
        <div class="q-pa-sm row flex-center bg-blue-1" style="height: 50%; width: 100%">
          <div
            v-for="pos in orderedPositions"
            :key="pos"
            class="row col-3 flex-center q-pa-md"
            style="font-size: x-large; font-weight: 500"
            @dblclick="selectPos(pos)"
            :class="{ current: pos === selectedPos }"
          >
            {{ positionLabels[pos] }} {{ rooms[roomNumber]?.players?.[pos]?.name }}
          </div>
          <div class="column fit">
            <div class="row flex-center">
              <div class="col-4">1</div>
              <div class="col-4">2</div>
              <div class="col-4">3</div>
            </div>
            <div class="row">
              <div>4</div>
              <div>5</div>
              <div>6</div>
            </div>
            <div class="row">
              <div>7</div>
              <div>8</div>
              <div>9</div>
            </div>
          </div>
        </div>
        <div class="q-pa-sm column flex-center" style="flex: auto">
          <div class="row flex-center" style="font-weight: bold; font-size: large">
            current room: {{ currentRoom?.name }} pos: {{ currentPos }}
          </div>
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

const mjStore = useMjStore();
const router = useRouter();

const positionLabels = {
  [Position.East]: "East",
  [Position.South]: "South",
  [Position.West]: "West",
  [Position.North]: "North",
};

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const selectedRoom = ref<RoomProp | null>(null);
const selectedPos = ref<Position>(Position.None);
const roomNumber = ref(0);

const orderedPositions: (Position.East | Position.South | Position.West | Position.North)[] = [
  Position.East,
  Position.South,
  Position.West,
  Position.North,
];

const temp = ref<number | null>(null);

const selected = ref({ roomname: "", pos: Position.East | -1 });
const currentRoom = ref<RoomModel | null>(null);
const currentPos = ref<Position>(Position.None);
const in_room = ref(false);
const in_pos = ref(false);

const rooms = computed(() => {
  return mjStore.roomList.map((room) => ({
    name: room.name,
    players: room.players
      .map((player) => ({ name: player.userName, pos: player.position }))
      .sort((a, b) => a.pos - b.pos),
  }));
});

function selectRoom(room: RoomProp, index: number) {
  if (!in_room.value) {
    in_room.value = true;
    selectedRoom.value = room;
    selected.value.roomname = room.name;
    roomNumber.value = index;
  } else if (room.name === currentRoom.value?.name) {
    in_room.value = false;
    selectedRoom.value = null;
    selectedPos.value = Position.None;
    selected.value.roomname = "";
    selected.value.pos = Position.None;
    roomNumber.value = 0;
  } else {
    selectedRoom.value = room;
    selected.value.roomname = room.name;
    selectedPos.value = Position.None;
    selected.value.pos = Position.None;
    temp.value = index;
    roomNumber.value = index;
  }
}

function selectPos(pos: Position) {
  if (pos === selectedPos.value && in_pos.value) {
    leaveRoom();
    selectedPos.value = Position.None;
  } else if (pos !== selectedPos.value && in_pos.value) {
    leaveRoom();
    selectedPos.value = pos;
    selected.value.pos = pos;
    joinRoom();
  } else if (pos !== selectedPos.value && !in_pos.value) {
    selectedPos.value = pos;
    selected.value.pos = pos;
    joinRoom();
  }
}

async function joinRoom() {
  try {
    if (!selectedRoom.value || selectedPos.value === Position.None) {
      window.alert("Please select a room and position first");
      return;
    }
    const room = await clientApi.joinRoom(selectedRoom.value.name, selectedPos.value);
    currentRoom.value = room;
    currentRoom.value.players = room.players;
    currentPos.value = selected.value.pos;
    in_room.value = true;
    in_pos.value = true;
  } catch {
    window.alert("join room failed");
  }
}

async function leaveRoom() {
  try {
    if (!currentRoom.value) {
      window.alert("Please select a room first abc");
      return;
    }
    await clientApi.leaveRoom(currentRoom.value.name);
    in_room.value = false;
    in_pos.value = false;
    selected.value.roomname = "";
    currentRoom.value = null;
    currentPos.value = Position.None;
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
