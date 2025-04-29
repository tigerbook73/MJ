<template>
  <q-page class="row justify-center">
    <q-card class="col-8">
      <q-card-section class="row flex-center q-col-gutter-md">
        <div v-for="room in rooms" :key="room.id" class="col-3 room">
          <GameRoom :room="room" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import GameRoom, { GameRoomProp } from "src/example/components/GameRoom.vue";
import { ref } from "vue";

const rooms = ref<GameRoomProp[]>([
  { id: 1, name: "Room 1" },
  { id: 2, name: "Room 2" },
  { id: 3, name: "Room 3" },
]);
</script>

<style scoped lang="scss">
.room {
  aspect-ratio: 1 / 1;
}
</style>
