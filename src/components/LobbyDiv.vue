<template>
  <div class="row fit">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['item', item.class]"
      @click="handleClick(item.id, item.name, group)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

type Item = {
  id: number;
  name: string;
  class: string;
};

defineProps<{
  items: Item[];
  group: number;
}>();

const emit = defineEmits(["clicked"]);

const handleClick = (id: number, name: string, group: number) => {
  emit("clicked", { id, name, group });
};
</script>

<style scoped>
.item {
  flex: 1;
  min-height: 35px;
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
