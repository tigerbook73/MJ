<template>
  <q-page class="row flex-center q-gutter-md">
    <div class="col-12 text-center">
      <h1>Join a Game Room</h1>
      <q-btn color="primary" label="Refresh Rooms" :loading="loading" @click="refreshRooms" />
    </div>
    <GameRoom v-for="(room, index) in rooms" :key="index" :roomName="room.name"></GameRoom>
  </q-page>
</template>

<script setup lang="ts">
import GameRoom from "src/components/GameRoom.vue";
import { socketListRoomAndWaitAck } from "src/websocket/client.api";
import { ref } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "JoinGamePage",
});

/**
 * define room interface
 * define rooms array ref var
 * define refresh() function, which will call listRoomRequest() and update rooms ref var
 * call refresh()
 * define a button to call refresh()
 */

// define room interface
interface Room {
  name: string;
  players: number;
}

// define rooms array ref var
const rooms = ref<Room[]>([]);
const loading = ref<boolean>(false); // Tracks loading state
const router = useRouter();

// define refresh() function, which will call listRoomRequest() and update rooms ref var
// Refresh the list of available rooms
async function refreshRooms() {
  loading.value = true;

  try {
    const email = sessionStorage.getItem("userEmail");
    const password = sessionStorage.getItem("userPassword");

    if (!email || !password) {
      alert("User not logged in. Redirecting to login.");
      router.push("/login");
      return;
    }

    const response = await socketListRoomAndWaitAck();

    if (response.status === "success") {
      rooms.value = response.data.map((room) => ({
        name: room.name,
        players: room.players.length,
      }));
    } else {
      alert(`Failed to fetch rooms: ${response.message}`);
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
    alert("An error occurred while fetching rooms.");
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss">
.room {
  width: 400px;
  height: 400px;
  background-color: lightblue;
}
</style>
