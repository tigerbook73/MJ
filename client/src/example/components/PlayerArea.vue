<template>
  <div v-if="exampleStore.currentGame" class="column square bg-green-3">
    <!-- top -->
    <div class="hx-2 row">
      <div class="wx-2">
        <q-toggle v-model="exampleStore.open" color="green" size="sm" class="q-mt-xs" label="明牌"></q-toggle>
      </div>

      <player-area-top class="wx-20" :class="{ 'bg-yellow-9': currentDirection === Direction.Top }" />
      <div class="wx-2"></div>
    </div>

    <!-- center -->
    <div class="hx-20 row">
      <player-area-vert
        :direction="Direction.Left"
        class="wx-2"
        :class="{ 'bg-yellow-9': currentDirection === Direction.Left }"
      />
      <wall-area class="wx-20" />
      <player-area-vert
        :direction="Direction.Right"
        class="wx-2"
        :class="{ 'bg-yellow-9': currentDirection === Direction.Right }"
      />
    </div>

    <!-- bottom -->
    <div class="hx-2 row">
      <div class="wx-2"></div>
      <player-area-me class="wx-20" :class="{ 'bg-yellow-9': currentDirection === Direction.Bottom }" />
      <div class="wx-2"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: "PlayerArea" };
</script>

<script setup lang="ts">
import WallArea from "../components/WallArea.vue";
import PlayerAreaTop from "./PlayerAreaTop.vue";
import PlayerAreaMe from "./PlayerAreaMe.vue";
import PlayerAreaVert from "./PlayerAreaVert.vue";
import { CommonUtil, Direction } from "../common/common";

import { useExampleStore } from "../stores/example-store";
import { computed } from "vue";

const exampleStore = useExampleStore();

const currentDirection = computed(() => {
  for (const direction of [Direction.Top, Direction.Left, Direction.Right, Direction.Bottom]) {
    const position = CommonUtil.mapPosition(exampleStore.currentPosition!, direction);
    if (exampleStore.currentGame!.current?.position === position) {
      return direction;
    }
  }
  return -1;
});
</script>

<style scoped lang="scss">
.square {
  aspect-ratio: 1 / 1;
  width: 100%;
  max-width: 100vmin;
  max-height: calc(100vh - 50px);
}
</style>
