<template>
  <div class="row fit">
    <div
      v-for="(room, index) in rooms"
      :key="index"
      :class="['room', room.class]"
      @click="handleClick(room.pos, group, room.display)"
    >
      {{ room.display }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Position } from "src/common/core/mj.game";
import { defineProps, defineEmits } from "vue";

type room = {
  pos: number;
  class: string;
  display: string;
};

defineProps<{
  rooms: room[];
  group: number;
}>();

const emit = defineEmits(["clicked"]);

const handleClick = (pos: Position, group: number, display: string) => {
  emit("clicked", { pos, group, display });
};
</script>

<style scoped>
.room {
  flex: 1;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: medium;
  font-weight: 500;
  cursor: pointer; /* Optional: for a clickable effect */
  padding: 10px; /* Optional: adjust padding to fit your design */
  margin: 3px; /* Optional: add margin between items */
  border-radius: 5px; /* Optional: rounded corners */
}
</style>
