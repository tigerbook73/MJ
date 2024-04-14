<template>
  <div class="flex-center" :class="flex1">
    <div :class="flex2">
      <comp-tile
        v-for="(tile, index) in tiles.slice(0, 17)"
        :key="index"
        :type="tile"
        :position="props.position"
        back
      ></comp-tile>
    </div>
    <div :class="flex2">
      <comp-tile
        v-for="(tile, index) in tiles.slice(17, 34)"
        :key="index"
        :type="tile"
        :position="props.position"
        back
      ></comp-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "CompTileWall",
});

import CompTile from "components/CompTile.vue";
import { useMjStore } from "src/stores/mj-store";
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
const tiles = computed(() =>
  props.position == "top"
    ? mjStore.topWall
    : props.position == "left"
    ? mjStore.leftWall
    : props.position == "right"
    ? mjStore.rightWall
    : mjStore.bottomWall
);
</script>
