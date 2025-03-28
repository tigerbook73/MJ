<template>
  <q-page class="q-pa-md column flex-center bg-blue-grey-5">
    <q-card class="q-pa-md row flex-center bg-green-1" style="width: 80%; min-height: 500px; flex: 1">
      <div class="q-pa-md row flex-center bg-blue-grey-3" style="width: 70%; margin: 5px">
        <LobbyDiv
          :rooms="[
            { pos: Position.East, class: ' bg-pink-3' },
            { pos: Position.South, class: ' bg-yellow-5' },
            { pos: Position.West, class: ' bg-blue-4' },
            { pos: Position.North, class: ' bg-red-5' },
          ]"
          :group="1"
          @clicked="handleClick"
        />
      </div>
      <q-separator vertical color="grey-8" />
      <div class="q-pa-sm column flex-center" style="flex: auto">
        <div class="row flex-center" style="font-weight: bold; font-size: large">current selection:</div>
        <div class="row flex-center" style="font-weight: bold; font-size: x-large">{{ selected.name }}</div>
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold" @click="logout"
          >Sign Out</q-btn
        >
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold">Refresh</q-btn>
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold"
          >New/Delete Room</q-btn
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
import LobbyDiv from "src/components/LobbyDiv.vue";
import { sendSignout } from "src/websocket/client.api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user-store";
import { Game, Position } from "src/common/core/mj.game";
import { clientApi } from "src/client/client-api";

const selected = ref();
const router = useRouter();
const userStore = useUserStore();

const handleClick = (selection: { pos: Position; group: number }) => {
  selected.value = selection;
};
const game = ref<Game | null>(null);

async function logout() {
  const response = await sendSignout();
  if (response.status == "success") {
    userStore.user = null;
    router.push("/login");
  }
}

async function joinRoom() {
  try {
    const room = await clientApi.joinRoom(selected.value.group, selected.value.pos);
    selected.value.group = room.name;
  } catch (error: any) {
    window.alert("join room failed");
  }
}
async function leaveRoom() {
  try {
    await clientApi.leaveRoom(selected.value.group);
  } catch (error: any) {
    window.alert("leave room failed");
  }
}

async function enterGame() {
  try {
    const data = await clientApi.enterGame(selected.value.group);
    game.value = data.game;
  } catch (error: any) {
    window.alert("enter game failed");
  }
}
</script>
