<template>
  <div v-if="exampleStore.currentGame" class="column square bg-green-3">
    <!-- top -->
    <div class="hx-2 row">
      <div class="wx-2">
        <q-toggle v-model="exampleStore.open" color="green" size="sm" class="q-mt-xs" label="明牌"></q-toggle>
      </div>

      <player-area-top class="wx-20" />
      <div class="wx-2"></div>
    </div>

    <!-- center -->
    <div class="hx-20 row">
      <player-area-vert :direction="Direction.Left" class="wx-2" />
      <wall-area class="wx-20" />
      <player-area-vert :direction="Direction.Right" class="wx-2" />
    </div>

    <!-- bottom -->
    <div class="hx-2 row">
      <div class="wx-2"></div>
      <player-area-me class="wx-20" />
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
import { Direction } from "../common/common";

import { useExampleStore } from "../stores/example-store";

const exampleStore = useExampleStore();
</script>

<style scoped lang="scss">
.square {
  aspect-ratio: 1 / 1;
  width: 100%;
  max-width: 100vmin;
  max-height: calc(100vh - 50px);
}
</style>
