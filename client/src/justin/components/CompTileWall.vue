<template>
  <div class="flex-center" :class="flex1">
    <!-- 上排 -->
    <div :class="flex2">
      <comp-tile
        v-for="(tile, i) in needReverse ? topRow.slice().reverse() : topRow"
        :key="i"
        :type="mjStore.IDtoName(tile)"
        :position="props.position"
        back
      />
    </div>
    <!-- 下排 -->
    <div :class="flex2">
      <comp-tile
        v-for="(tile, i) in needReverse ? bottomRow.slice().reverse() : bottomRow"
        :key="i"
        :type="mjStore.IDtoName(tile)"
        :position="props.position"
        back
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "CompTileWall",
});

import CompTile from "src/justin/components/CompTile.vue";
import { useMjStore } from "src/justin/stores/mj-store";
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
  const positions: Record<string, typeof mjStore.wallTop> = {
    top: mjStore.wallTop,
    left: mjStore.wallLeft,
    right: mjStore.wallRight,
    bottom: mjStore.wallBottom,
  };
  return positions[props.position] || positions.bottom;
});

const topRow = computed(() => tiles.value.filter((_, i) => i % 2 === 0));
const bottomRow = computed(() => tiles.value.filter((_, i) => i % 2 === 1));
const needReverse = computed(() => props.position === "left" || props.position === "bottom");
</script>
