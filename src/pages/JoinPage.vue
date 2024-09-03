<template>
  <q-page class="row flex-center q-gutter-md">
    <game-room name=""></game-room>
    <game-room>room2</game-room>
    <game-room>room3</game-room>
  </q-page>
</template>

<script setup lang="ts">
import GameRoom from "src/components/GameRoom.vue";

defineOptions({
  name: "JoinPage",
});
</script>
