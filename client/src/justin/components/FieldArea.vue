<template>
  <div class="area-board">
    <div class="row h-16">
      <div class="w-16 bg-grey-6"></div>
      <player-discard-top class="w-18 bg-grey-8"></player-discard-top>
      <div class="w-16 bg-grey-6"></div>
    </div>

    <div class="row h-18">
      <player-discard-left class="w-16 bg-grey-8"></player-discard-left>
      <div class="w-18 column flex-center" :class="mjStore.state === GameState.End ? 'bg-green-4' : 'bg-grey-6'">
        <div class="flex-centre" style="font-size: 1000%" v-show="mjStore.state === GameState.End">WIN</div>
      </div>
      <player-discard-right class="w-16 bg-grey-8"></player-discard-right>
    </div>

    <div class="row h-16">
      <div class="w-16 bg-grey-6"></div>
      <player-discard-bottom class="w-18 bg-grey-8"></player-discard-bottom>
      <div class="w-16 bg-grey-6"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameState } from "src/common/core/mj.game";
import PlayerDiscardBottom from "./PlayerDiscardBottom.vue";
import PlayerDiscardLeft from "./PlayerDiscardLeft.vue";
import PlayerDiscardRight from "./PlayerDiscardRight.vue";
import PlayerDiscardTop from "./PlayerDiscardTop.vue";
import { useMjStore } from "src/justin/stores/mj-store";

defineOptions({
  name: "FieldArea",
});
const mjStore = useMjStore();
</script>
