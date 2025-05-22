<template>
  <div class="flex-center" :class="flex1">
    <div :class="flex2">
      <comp-tile v-for="(tile, value) in tiles1" :key="value" :type="tile" :position="props.position" back></comp-tile>
    </div>
    <div :class="flex2">
      <comp-tile v-for="(tile, value) in tiles2" :key="value" :type="tile" :position="props.position" back></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "CompTileWall",
});

import CompTile from "src/simon/components/CompTile.vue";
import { useMjStore } from "src/simon/stores/mj-store";
import { computed } from "vue";

interface Props {
  position: "top" | "left" | "right" | "bottom";
}

const props = withDefaults(defineProps<Props>(), {
  position: "top",
});

const flex1 = props.position === "top" || props.position === "bottom" ? "column" : "row";
const flex2 = props.position === "top" || props.position === "bottom" ? "row" : "column";

const mjStore = useMjStore();
const tiles = computed(() => {
  const positions: Record<string, typeof mjStore.topWall> = {
    top: mjStore.topWall,
    left: mjStore.leftWall,
    right: mjStore.rightWall,
    bottom: mjStore.bottomWall,
  };
  return positions[props.position] || positions.bottom;
});

const tiles1 = computed(() => tiles.value.filter((tile, value) => value % 2));
const tiles2 = computed(() => tiles.value.filter((tile, value) => (value + 1) % 2));
</script>
