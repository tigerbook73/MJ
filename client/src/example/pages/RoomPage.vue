<template>
  <q-page class="row justify-center">
    <q-card class="col-8">
      <q-card-section class="row flex-center q-col-gutter-md">
        <div v-for="room in exampleStore.roomList" :key="room.name" class="col-12 col-md-6 col-xl-4 square">
          <GameRoom :room="room" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import GameRoom from "src/example/components/GameRoom.vue";
import { useExampleStore } from "../stores/example-store";
import { socketClient } from "src/client/socket-client";

const exampleStore = useExampleStore();
socketClient.listRoom();
</script>

<style scoped lang="scss">
.square {
  aspect-ratio: 1 / 1;
}
</style>
