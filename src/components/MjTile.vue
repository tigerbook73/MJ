<template>
  <div class="south" :style="position">{{ props.title }}</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  id?: string;
  title: string;
  rotate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: "",
  title: "",
  rotate: false,
});

const width = "2.5vh";
const height = "4vh";

const position = computed(() => ({
  width: props.rotate ? height : width,
  height: props.rotate ? width : height,
}));
</script>

<style lang="scss">
.south {
  margin: 1px;
  color: red;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  text-decoration: underline;
  text-shadow: 1px 1px 1px #000;
  background-color: #f0f0f0;
  border: 1px solid #000;
  padding: 2px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #000;
  transition: all 0.5s;
  &:hover {
    background-color: #000;
    color: #f0f0f0;
  }
}
</style>
