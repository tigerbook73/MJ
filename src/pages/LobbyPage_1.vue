<template>
  <q-page class="column flex-center">
    <q-card class="row" style="width: 90%">
      <q-card-section v-for="room in rooms" class="col flex-center"
        >{{ room }}

        <q-card-section class="row">
          <q-btn>1</q-btn>
          <q-btn>1</q-btn>
        </q-card-section>
        <q-card-section class="row">
          <q-btn>1</q-btn>
          <q-btn>1</q-btn>
        </q-card-section>
      </q-card-section>
      <q-separator vertical color="red" />
      <div class="column flex-center">
        <div>current selection:</div>
        <div>{{ currentSelection }}</div>
        <q-btn @click="logout">Sign Out</q-btn>
        <q-btn>Refresh</q-btn>
        <q-btn>New/Delete Room</q-btn>
        <q-btn>Join/Leave</q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { sendListRoom, sendSignout } from "src/websocket/client.api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user-store";
import { RoomModel } from "src/common/models/room.model";

const currentSelection = ref("None");
const router = useRouter();
const rooms = ref([] as RoomModel[]);

async function refreshRooms() {
  const response = await sendListRoom();
  rooms.value = [];
  for (const room of response.data) {
    rooms.value.push(room);
  }
}

async function logout() {
  const response = await sendSignout();
  const userStore = useUserStore();
  if (response.status == "success") {
    userStore.user = null;
    router.push("/login");
  }
}
</script>
