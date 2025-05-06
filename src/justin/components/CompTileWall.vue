<template>
  <div class="flex-center" :class="flex1">
    <div :class="flex2">
<<<<<<<< HEAD:src/simon/components/CompTileWall.vue
      <comp-tile v-for="(tile, value) in tiles1" :key="value" :type="tile" :position="props.position" back></comp-tile>
    </div>
    <div :class="flex2">
      <comp-tile v-for="(tile, value) in tiles2" :key="value" :type="tile" :position="props.position" back></comp-tile>
========
      <comp-tile
        v-for="(tile, index) in tiles.slice(0, 17)"
        :key="index"
        :type="mjStore.IDtoName(tile)"
        :position="props.position"
        back
      ></comp-tile>
    </div>
    <div :class="flex2">
      <comp-tile
        v-for="(tile, index) in tiles.slice(17, 34)"
        :key="index"
        :type="mjStore.IDtoName(tile)"
        :position="props.position"
        back
      ></comp-tile>
>>>>>>>> origin/main:src/justin/components/CompTileWall.vue
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "CompTileWall",
});

<<<<<<<< HEAD:src/simon/components/CompTileWall.vue
import CompTile from "src/simon/components/CompTile.vue";
import { useMjStore } from "src/simon/stores/mj-store";
========
import CompTile from "src/justin/components/CompTile.vue";
import { useMjStore } from "src/justin/stores/mj-store";
>>>>>>>> origin/main:src/justin/components/CompTileWall.vue
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
  const positions: Record<string, typeof mjStore.wallWest> = {
    top: mjStore.wallWest,
    left: mjStore.wallNorth,
    right: mjStore.wallSouth,
    bottom: mjStore.wallEast,
  };
  return positions[props.position] || positions.bottom;
});

const tiles1 = computed(() => tiles.value.filter((tile, value) => value % 2));
const tiles2 = computed(() => tiles.value.filter((tile, value) => (value + 1) % 2));
</script>
