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

/**
 * define room interface
 * define rooms array ref var
 * define refresh() function, which will call listRoomRequest() and update rooms ref var
 * call refresh()
 * define a button to call refresh()
 */

const rooms = ref([]);
</script>

<style lang="scss">
.room {
  width: 400px;
  height: 400px;
  background-color: lightblue;
}
</style>
