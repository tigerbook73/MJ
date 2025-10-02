<template>
  <q-page class="row flex-center q-gutter-md">
    <div class="col-12 text-center">
      <h1>Join a Game Room</h1>
      <q-btn color="primary" label="Refresh Rooms" :loading="loading" @click="refreshRooms" />
    </div>
    <GameRoom v-for="(room, index) in rooms" :key="index" :roomName="room.name" :players="room.players"
      @update="refreshRooms"></GameRoom>
  </q-page>
</template>

<script setup lang="ts">
import GameRoom from "src/simon/components/GameRoom.vue";
// import { useRouter } from "vue-router";
import { computed, ref } from "vue";
// import { PlayerModel } from "@/common/models/player.model";
import { clientApi } from "src/client/client-api";
import { roomStore } from "src/simon/stores/room-store";

defineOptions({
  name: "JoinGamePage",
});
// const router = useRouter();
const useRoomStore = roomStore();
/**
 * define room interface
 * define rooms array ref var
 * define refresh() function, which will call listRoomRequest() and update rooms ref var
 * call refresh()
 * define a button to call refresh()
 */

// import roomList from room store

// define room interface
// interface Room {
//   name: string;
//   players: PlayerModel[];
// }

// define rooms array from room store
const rooms = computed(() => useRoomStore.roomList);
const loading = ref<boolean>(false); // Tracks loading state

// define refresh() function, which will call listRoomRequest() and update rooms ref var
// Refresh the list of available rooms
async function refreshRooms() {
  loading.value = true;

  try {
    const response = await clientApi.listRoom();

    if (response && response.length > 0) {
      // rooms = response.map((room) => ({
      //   name: room.name,
      //   players: room.players,
      // }));
      useRoomStore.setRooms(response);
    } else {
      alert(`Failed to fetch rooms: ${JSON.stringify(response)}`);
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
