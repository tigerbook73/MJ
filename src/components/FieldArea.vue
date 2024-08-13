<template>
  <div class="area-board">
    <div class="row h-16">
      <div class="w-16 bg-grey-6">T2:L2</div>
      <player-discard-top class="w-18 bg-grey-8"></player-discard-top>
      <div class="w-16 bg-grey-6">T2L8</div>
    </div>

    <div class="row h-18">
      <player-discard-left class="w-16 bg-grey-8"></player-discard-left>
      <div class="w-18 column flex-center" :class="userMj.isWinning ? 'bg-green-4' : 'bg-grey-6'">
        <div>text</div>
      </div>
      <player-discard-right class="w-16 bg-grey-8"></player-discard-right>
    </div>

    <div class="row h-16">
      <div class="w-16 bg-grey-6">T2:L2</div>
      <player-discard-bottom class="w-18 bg-grey-8"></player-discard-bottom>
      <div class="w-16 bg-grey-6">T2L8</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerDiscardBottom from "./PlayerDiscardBottom.vue";
import PlayerDiscardLeft from "./PlayerDiscardLeft.vue";
import PlayerDiscardRight from "./PlayerDiscardRight.vue";
import PlayerDiscardTop from "./PlayerDiscardTop.vue";
import { useMjStore } from "src/stores/mj-store";

defineOptions({
  name: "FieldArea",
});
const userMj = useMjStore();
</script>
