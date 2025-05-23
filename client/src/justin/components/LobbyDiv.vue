<template>
  <div class="row fit q-pa-md">
    <div class="q-pa-md" style="font-size: x-large; font-weight: 500">
      {{ room.name }}
    </div>
    <div class="row full-width q-col-gutter-md">
      <div v-for="(player, index) in room.players" :key="index" class="col-3 items-center">
        <div class="player" @dblclick="handleClick(player)">
          {{ player.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export interface RoomProp {
  name: string;
  players: MyPlayer[];
}
export interface MyPlayer {
  name: string;
  pos: Position;
}
</script>
<script setup lang="ts">
import type { Position } from "@common/core/mj.game";
import { defineProps, defineEmits } from "vue";

defineProps<{
  room: RoomProp;
}>();

const emit = defineEmits<{
  (event: "selected", value: MyPlayer): void;
}>();

const handleClick = (player: MyPlayer) => {
  emit("selected", player);
};
</script>

<style scoped>
.player {
  flex: 1;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: medium;
  font-weight: 500;
  background-color: rgb(220, 220, 170);
  cursor: pointer; /* Optional: for a clickable effect */
  padding: 10px; /* Optional: adjust padding to fit your design */
  margin: 3px; /* Optional: add margin between items */
  border-radius: 5px; /* Optional: rounded corners */
}
.player:hover {
  background-color: rgb(145, 255, 145);
}
</style>
