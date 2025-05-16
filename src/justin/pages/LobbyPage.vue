<template>
  <q-page class="q-pa-md column flex-center bg-blue-grey-5">
    <div class="row" style="width: 80%; min-height: 500px">
      <q-card class="q-pa-md col-5 row flex-center bg-green-2">
        <div class="q-pa-md column flex-center" style="width: 80%; margin: 5px">
          <LobbyDiv
            v-for="(room, index) in rooms"
            :key="index"
            :room="room"
            @selected="(player) => handleSelected(room, player)"
          />
          <div
            class="row fit q-pa-md"
            style="font-size: x-large; font-weight: 500"
            v-for="(room, index) in rooms"
            :key="index"
            :roomname="room.name"
            @click="selectRoom(room)"
            :class="{ selected: room.name === tempSelectRoom }"
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
              @click="selectPos(Position.North)"
              :class="{ selected: Position.North === tempSelectPos }"
            >
              North
            </div>
          </div>
          <div class="column col-4 flex-center">
            <div
              class="row flex-center q-pa-md"
              style="font-size: x-large; font-weight: 500"
              @click="selectPos(Position.West)"
              :class="{ selected: Position.West === tempSelectPos }"
            >
              West
            </div>

            <div
              class="row flex-center q-pa-md"
              style="font-size: x-large; font-weight: 500"
              @click="selectPos(Position.East)"
              :class="{ selected: Position.East === tempSelectPos }"
            >
              East
            </div>
          </div>
          <div class="row col-4 flex-center">
            <div
              class="row flex-center q-pa-md"
              style="font-size: x-large; font-weight: 500"
              @click="selectPos(Position.South)"
              :class="{ selected: Position.South === tempSelectPos }"
            >
              South
            </div>
          </div>
        </div>
        <div class="q-pa-sm column flex-center" style="flex: auto">
          <div class="row flex-center" style="font-weight: bold; font-size: large">
            current selection: {{ currentRoom }} {{ currentPos }}
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
import LobbyDiv, { MyPlayer, RoomProp } from "src/justin/components/LobbyDiv.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Position } from "src/common/core/mj.game";
import { clientApi } from "src/client/client-api";
import { setGame } from "src/core/mjGame";
import { useMjStore } from "src/justin/stores/mj-store";

const router = useRouter();
const mjStore = useMjStore();

const tempSelectRoom = ref("");
const tempSelectPos = ref<Position | null>(null);

const selected = ref({ roomname: "", pos: Position.East | -1 });
const currentRoom = ref("");
const currentPos = ref<Position | null>(Position.East);
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

function selectRoom(room: RoomProp) {
  if (room.name != tempSelectRoom.value) {
    tempSelectRoom.value = room.name;
    selected.value.roomname = room.name;
  } else {
    tempSelectRoom.value = "";
    selected.value.roomname = "";
  }
}

function selectPos(pos: Position) {
  if (pos != tempSelectPos.value) {
    tempSelectPos.value = pos;
    selected.value.pos = pos;
  } else {
    tempSelectPos.value = null;
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
    currentRoom.value = "";
    currentPos.value = null;
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

<style scoped>
.selected {
  background-color: green;
  color: white; /* 可选，更清晰 */
}
</style>
