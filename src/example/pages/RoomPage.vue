<template>
  <q-page class="row justify-center">
    <q-card class="col-8">
      <q-card-section class="row flex-center q-col-gutter-md">
        <div v-for="room in rooms" :key="room.id" class="col-6 col-md-4 col-xl-2 room">
          <GameRoom :room="room" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { Position } from "src/common/core/mj.game";
import GameRoom, { GameRoomProp } from "src/example/components/GameRoom.vue";
import { ref } from "vue";

const rooms = ref<GameRoomProp[]>([
  {
    id: 1,
    name: "Room 1",
    players: {
      east: { id: 1, position: Position.East, name: "Player East", email: "" },
      south: { id: 4, position: Position.South, name: "Player South", email: "" },
      west: { id: 2, position: Position.West, name: "Player West", email: "" },
      north: { id: 3, position: Position.North, name: "Player North", email: "" },
    },
  },
  {
    id: 2,
    name: "Room 2",
    players: {
      east: { id: 1, position: Position.East, name: "Player East", email: "" },
      south: { id: 4, position: Position.South, name: "Player South", email: "" },
      west: { id: 2, position: Position.West, name: "Player West", email: "" },
      north: { id: 3, position: Position.North, name: "Player North", email: "" },
    },
  },
  {
    id: 3,
    name: "Room 3",
    players: {
      east: { id: 1, position: Position.East, name: "Player East", email: "" },
      south: { id: 4, position: Position.South, name: "Player South", email: "" },
      west: { id: 2, position: Position.West, name: "Player West", email: "" },
      north: { id: 3, position: Position.North, name: "Player North", email: "" },
    },
  },
]);
</script>

<style scoped lang="scss">
.room {
  aspect-ratio: 1 / 1;
}
</style>
