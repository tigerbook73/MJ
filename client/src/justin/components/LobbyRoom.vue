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
import { defineEmits } from "vue";

type Item = {
  id: number;
  name: string;
  class: string;
};

defineProps<{
  items: Item[]; // List of rooms passed as props
  group: number; // Group ID
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
  cursor: pointer;
  padding: 10px;
  margin: 3px;
  border-radius: 5px;
}
</style>
