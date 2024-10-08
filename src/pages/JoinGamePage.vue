<template>
  <q-page class="row flex-center q-gutter-md">
    <GameRoom v-for="(room, index) in rooms" :key="index" :name="room.name" :players="room.players"></GameRoom>
  </q-page>
</template>

<script setup lang="ts">
import GameRoom from "src/components/GameRoom.vue";
import { ref } from "vue";

defineOptions({
  name: "JoinGamePage",
});

const rooms = ref([
  { name: "Room 1", players: ["John", "Tom", "Justin", "Simon"] },
  { name: "Room 2", players: ["1", "2", "", ""] },
  { name: "Room 3", players: ["", "", "Hello", "World"] },
]);
</script>

<style lang="scss">
.room {
  width: 400px;
  height: 400px;
  background-color: lightblue;
}
</style>
