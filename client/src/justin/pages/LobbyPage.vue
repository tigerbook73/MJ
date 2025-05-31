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
      </q-card>
      <q-card class="col-7 q-pa-md column flex-center bg-green-1">
        <div class="q-pa-sm row flex-center bg-blue-1" style="height: 75%; width: 100%">
          <div class="column flex-center" style="width: 100%">
            <div class="row flex-center" style="width: 100%">
              <div class="col-4"></div>
              <div
                class="column col-4 flex-center no-select"
                :class="{ current: Position.West === selectedPos }"
                style="font-size: x-large; font-weight: 500; cursor: pointer"
                @dblclick="selectPos(Position.West)"
              >
                West
                <div>{{ rooms[roomNumber]?.players?.[Position.West]?.name }}</div>
              </div>
              <div class="col-4"></div>
            </div>

            <div class="row flex-center" style="width: 100%">
              <div
                class="column col-4 flex-center no-select"
                :class="{ current: Position.North === selectedPos }"
                style="font-size: x-large; font-weight: 500; cursor: pointer"
                @dblclick="selectPos(Position.North)"
              >
                North
                <div>{{ rooms[roomNumber]?.players?.[Position.North]?.name }}</div>
              </div>
              <div class="col-4"></div>
              <div
                class="column col-4 flex-center no-select"
                :class="{ current: Position.South === selectedPos }"
                style="font-size: x-large; font-weight: 500; cursor: pointer"
                @dblclick="selectPos(Position.South)"
              >
                South
                <div>{{ rooms[roomNumber]?.players?.[Position.South]?.name }}</div>
              </div>
            </div>

            <div class="row flex-center" style="width: 100%">
              <div class="col-4"></div>
              <div
                class="column col-4 flex-center no-select"
                :class="{ current: Position.East === selectedPos }"
                style="font-size: x-large; font-weight: 500; cursor: pointer"
                @dblclick="selectPos(Position.East)"
              >
                East
                <div>{{ rooms[roomNumber]?.players?.[Position.East]?.name }}</div>
              </div>
              <div class="col-4"></div>
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
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import type { RoomProp } from "src/justin/components/LobbyDiv.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Position } from "@common/core/mj.game";
import { clientApi } from "src/client/client-api";
import { setGame } from "src/core/mjGame";
import { useMjStore } from "src/justin/stores/mj-store";
import type { RoomModel } from "@common/models/room.model";

const mjStore = useMjStore();
const router = useRouter();

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

const rooms = computed(() => {
  return mjStore.roomList.map((room) => ({
    name: room.name,
    players: room.players
      .map((player) => ({ name: player.userName, pos: player.position }))
      .sort((a, b) => a.pos - b.pos),
  }));
});

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

.no-select {
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
}
</style>
