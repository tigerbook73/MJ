<template>
  <q-page class="row flex-center q-gutter-md">
    <div class="col-12 text-center">
      <h1>Join a Game Room</h1>
      <q-btn color="primary" label="Refresh Rooms" :loading="loading" @click="refreshRooms" />
    </div>
    <GameRoom
      v-for="(room, index) in rooms"
      :key="index"
      :roomName="room.name"
      :players="room.players"
      @update="refreshRooms"
    ></GameRoom>
  </q-page>
</template>

<script setup lang="ts">
import GameRoom from "src/components/GameRoom.vue";
import { useRouter } from "vue-router";
import { userStore } from "src/stores/user-store";
import { socketListRoomAndWaitAck } from "src/websocket/client.api";
import { ref } from "vue";

defineOptions({
  name: "JoinGamePage",
});
const store = userStore();
const router = useRouter();
if (!store.user) {
  router.push("/sign-in");
}
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
  players: { name: string; position: string; type: string }[];
}

// define rooms array ref var
const rooms = ref<Room[]>([]);
const loading = ref<boolean>(false); // Tracks loading state

// define refresh() function, which will call listRoomRequest() and update rooms ref var
// Refresh the list of available rooms
async function refreshRooms() {
  loading.value = true;

  try {
    const response = await socketListRoomAndWaitAck();

    if (response.status === "success") {
      rooms.value = response.data.map((room) => ({
        name: room.name,
        players: room.players.map((player) => ({
          name: player.userName,
          position: player.position,
          type: player.type,
        })),
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

refreshRooms();
</script>

<style lang="scss">
.room {
  width: 400px;
  height: 400px;
  background-color: lightblue;
}
</style>
