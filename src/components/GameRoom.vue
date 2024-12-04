<template>
  <q-card class="room column">
    <!-- Top (North) -->
    <div class="col-3">
      <div class="row full-height">
        <div class="col-3"></div>
        <q-btn
          flat
          class="col-6 bg-blue-4"
          :label="player1"
          @click="joinRoom('North')"
          :disable="props.isJoined"
        ></q-btn>
        <div class="col-3"></div>
      </div>
    </div>

    <!-- Center (West, Room Name, East) -->
    <div class="col-6">
      <div class="row full-height">
        <q-btn
          flat
          class="col-3 bg-blue-4"
          :label="player2"
          @click="joinRoom('West')"
          :disable="props.isJoined"
        ></q-btn>
        <div class="col-6 bg-green-4 row flex-center">
          <div>{{ props.roomName }}</div>
        </div>
        <q-btn
          flat
          class="col-3 bg-blue-4"
          :label="player3"
          @click="joinRoom('East')"
          :disable="props.isJoined"
        ></q-btn>
      </div>
    </div>

    <!-- Bottom (South) -->
    <div class="col-3">
      <div class="row full-height">
        <div class="col-3"></div>
        <q-btn
          flat
          class="col-6 bg-blue-4"
          :label="player4"
          @click="joinRoom('South')"
          :disable="props.isJoined"
        ></q-btn>
        <div class="col-3"></div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMjStore } from "src/stores/mj-store";

interface Props {
  roomName: string;
  isJoined: boolean;
  players: string[];
}

const props = withDefaults(defineProps<Props>(), {
  roomName: "",
  isJoined: false,
  players: () => [],
});

const player1 = ref("Player 1");
const player2 = ref("Player 2");
const player3 = ref("Player 3");
const player4 = ref("Player 4");

const mjStore = useMjStore();
const router = useRouter();

function joinRoom(position: string) {
  if (props.isJoined) return;

  const username = "User"; // Replace with actual user data
  mjStore.refresh(); // Synchronize state

  switch (position) {
    case "North":
      player1.value = `${username} (North)`;
      break;
    case "West":
      player2.value = `${username} (West)`;
      break;
    case "East":
      player3.value = `${username} (East)`;
      break;
    case "South":
      player4.value = `${username} (South)`;
      break;
  }

  mjStore.refresh(); // Update the game room state
  router.push("/game-page");
}
</script>

<style lang="scss">
.room {
  width: 400px;
  height: 400px;
  background-color: white;
}
</style>
