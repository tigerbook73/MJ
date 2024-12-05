<template>
  <q-page class="q-pa-md column flex-center bg-blue-grey-5">
    <q-card class="q-pa-md row flex-center bg-green-1" style="width: 80%; min-height: 500px; flex: 1">
      <div class="q-pa-md column flex-center bg-blue-grey-3" style="width: 70%; margin: 5px">
        <LobbyDiv
          :items="[
            { id: 0, name: '东', class: ' bg-pink-3' },
            { id: 1, name: '南', class: ' bg-yellow-5' },
            { id: 2, name: '西', class: ' bg-blue-4' },
            { id: 3, name: '北', class: ' bg-red-5' },
          ]"
          :group="1"
          @clicked="handleClick"
        />
      </div>
      <q-separator vertical color="grey-8" />
      <div class="q-pa-sm column flex-center" style="flex: auto">
        <div class="row flex-center" style="font-weight: bold; font-size: large">current selection:</div>
        <div class="row flex-center" style="font-weight: bold; font-size: x-large">{{ currentSelection }}</div>
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold" @click="logout"
          >Sign Out</q-btn
        >
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold">Refresh</q-btn>
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold"
          >New/Delete Room</q-btn
        >
        <q-btn flat class="q-pa-sm flex-center bg-white" style="font-size: large; font-weight: bold">Join/Leave</q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import LobbyDiv from "src/components/LobbyDiv.vue";
import { sendSignout } from "src/websocket/client.api";
import { ref } from "vue";
import { useRouter } from "vue-router";

const currentSelection = ref("None");
const router = useRouter();

const handleClick = (selection: { id: number; name: string; group: number }) => {
  currentSelection.value = selection.name;
};

async function logout() {
  const response = await sendSignout();
  if (response.status == "success") {
    router.push("/connect");
  }
}
</script>
