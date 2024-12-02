<template>
  <q-page class="row flex-center q-gutter-md">
    <game-room roomName="Room 1" :isJoined="isJoined" @joinRoom="handleJoin"></game-room>
    <game-room roomName="Room 2" :isJoined="isJoined" @joinRoom="handleJoin"></game-room>
    <game-room roomName="Room 3" :isJoined="isJoined" @joinRoom="handleJoin"></game-room>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GameRoom from "src/components/GameRoom.vue";

defineOptions({
  name: "JoinPage",
});

const isJoined = ref(false);

function handleJoin() {
  isJoined.value = true;
}
</script>
