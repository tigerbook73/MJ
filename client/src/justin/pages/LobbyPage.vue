<template>
  <q-page class="q-pa-md column flex-center bg-blue-grey-5">
    <div class="row" style="width: 80%; min-height: 500px">
      <div class="q-pa-md col-5 row flex-center bg-green-2" style="align-items: start">
        <div
          class="q-pa-md column flex-center"
          style="width: 80%; margin: 5px; align-items: start; font-size: x-large; font-weight: 800"
        >
          <div>Room List</div>

          <div
            class="row fit q-pa-md no-select"
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
      </div>
      <div class="col-7 q-pa-md column flex-center bg-green-1">
        <div class="q-pa-sm row flex-center bg-blue-1" style="height: 70%; width: 100%">
          <div class="column flex-center" style="width: 100%">
            <div v-for="rowIndex in 3" :key="rowIndex" class="row flex-center" style="width: 100%">
              <div v-for="colIndex in 3" :key="colIndex" class="col-4">
                <template v-for="seat in seatLayout" :key="seat.label">
                  <div
                    v-if="seat.row === rowIndex - 1 && seat.col === colIndex - 1"
                    class="column col-4 flex-center no-select"
                    :class="{ current: seat.pos === selectedPos }"
                    style="font-size: x-large; font-weight: 500; cursor: pointer"
                    @dblclick="selectPos(seat.pos)"
                  >
                    {{ seat.label }}
                    <div>
                      {{ rooms[roomNumber]?.players?.[seat.pos]?.name }}
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="q-pa-sm column flex-center" style="flex: auto">
          <div class="column flex-center" style="font-weight: bold; font-size: large">
            <div>room: {{ selectedRoom?.name || "None" }}</div>
            <div>pos: {{ positionNames[currentPos] }}</div>
          </div>
          <q-btn
            flat
            class="q-pa-sm flex-center bg-white"
            style="font-size: large; font-weight: bold"
            @click="enterGame"
            >EnterGame</q-btn
          >
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import type { RoomProp } from "src/justin/components/LobbyDiv.vue";
import { computed, ref } from "vue";
import { Position } from "@common/core/mj.game";
import { clientApi } from "src/client/client-api";
import { useMjStore } from "src/justin/stores/mj-store";
import type { RoomModel } from "@common/models/room.model";

const mjStore = useMjStore();

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const selectedRoom = ref<RoomProp | null>(null);
const selectedPos = ref<Position>(Position.None);
const roomNumber = ref(-1);

const display = ref({ roomname: "", pos: Position.None });
const currentRoom = ref<RoomModel | null>(null);
const currentPos = ref<Position>(Position.None);
const in_room = ref(false);
const in_pos = ref(false);

const positionNames = {
  [Position.West]: "West",
  [Position.North]: "North",
  [Position.South]: "South",
  [Position.East]: "East",
  [Position.None]: "None",
};

const seatLayout = [
  { label: "West", pos: Position.West, row: 0, col: 1 },
  { label: "North", pos: Position.South, row: 1, col: 0 },
  { label: "South", pos: Position.North, row: 1, col: 2 },
  { label: "East", pos: Position.East, row: 2, col: 1 },
];

const rooms = computed(() => {
  return mjStore.roomList.map((room) => ({
    name: room.name,
    players: room.players
      .map((player) => ({ name: player.userName, pos: player.position }))
      .sort((a, b) => a.pos - b.pos),
  }));
});

function refreshStatus() {
  if (mjStore.room) {
    in_room.value = true;
    in_pos.value = true;
    selectedRoom.value = {
      name: mjStore.room.name,
      players: mjStore.room.players
        .map((player) => ({ name: player.userName, pos: player.position }))
        .sort((a, b) => a.pos - b.pos),
    };
    display.value.roomname = mjStore.room.name;
    display.value.pos = mjStore.position;
    selectedPos.value = mjStore.position;
    currentRoom.value = mjStore.room;
    currentPos.value = mjStore.position;
    roomNumber.value = rooms.value.findIndex((room) => room.name === mjStore.room?.name);
  }
}
function selectRoom(room: RoomProp, index: number) {
  try {
    if (!in_room.value) {
      in_room.value = true;
      selectedRoom.value = room;
      display.value.roomname = room.name;
      roomNumber.value = index;
    } else if (room.name === currentRoom.value?.name || room.name === selectedRoom.value?.name) {
      leaveRoom();
      selectedRoom.value = null;
      selectedPos.value = Position.None;
      display.value.roomname = "";
      display.value.pos = Position.None;
      roomNumber.value = -1;
      in_room.value = false;
      in_pos.value = false;
    } else if (room.name !== currentRoom.value?.name) {
      leaveRoom();
      in_pos.value = false;
      selectedRoom.value = room;
      display.value.roomname = room.name;
      selectedPos.value = Position.None;
      display.value.pos = Position.None;
      roomNumber.value = index;
    }
  } catch (error) {
    window.alert(error);
  }
}

function selectPos(pos: Position) {
  try {
    if (!in_room.value) {
      return;
    }
    if (pos === selectedPos.value && in_pos.value) {
      leaveRoom();
      in_pos.value = false;
      selectedPos.value = Position.None;
      display.value.pos = Position.None;
    } else if (pos !== selectedPos.value && in_pos.value) {
      leaveRoom();
      selectedPos.value = pos;
      display.value.pos = pos;
      joinRoom();
    } else if (!in_pos.value) {
      in_pos.value = true;
      selectedPos.value = pos;
      display.value.pos = pos;
      joinRoom();
    }
  } catch (error) {
    window.alert(error);
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
    currentPos.value = selectedPos.value;
  } catch {
    window.alert("join room failed");
  }
}

async function leaveRoom() {
  try {
    if (!currentRoom.value) {
      return;
    }
    await clientApi.leaveRoom(currentRoom.value.name);
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
    await clientApi.enterGame(currentRoom.value.name);
    mjStore.my_pos = currentPos.value;
  } catch (error: any) {
    window.alert(error.message);
  }
}

refreshStatus();
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

.no-select {
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
}

.seat {
  outline-color: black;
}
</style>
