<template>
  <div class="area-board">
    <div class="row h-16">
      <div class="w-16 bg-red">T2:L2</div>
      <player-discard-top class="w-18 bg-blue"></player-discard-top>
      <div class="w-16 bg-red">T2L8</div>
    </div>

    <div class="row h-18">
      <player-discard-left class="w-16 bg-blue"></player-discard-left>
      <div class="w-18 bg-green column flex-center"><div>text</div></div>
      <player-discard-right class="w-16 bg-blue"></player-discard-right>
    </div>

    <div class="row h-16">
      <div class="w-16 bg-red">T2:L2</div>
      <player-discard-bottom class="w-18 bg-blue"></player-discard-bottom>
      <div class="w-16 bg-red">T2L8</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerDiscardBottom from "./PlayerDiscardBottom.vue";
import PlayerDiscardLeft from "./PlayerDiscardLeft.vue";
import PlayerDiscardRight from "./PlayerDiscardRight.vue";
import PlayerDiscardTop from "./PlayerDiscardTop.vue";

defineOptions({
  name: "FieldArea",
});
</script>
