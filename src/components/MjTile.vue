<template>
  <div class="south" :style="position">{{ props.title }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  id?: number;
  title: string;
  top: string;
  left: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  title: '',
  top: '10px',
  left: '10px',
});

const position = computed(() => ({
  top: props.top,
  left: props.left,
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
  width: 30px;
  height: 50px;

  position: absolute;
}
</style>
