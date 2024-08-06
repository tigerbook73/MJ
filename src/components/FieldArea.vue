<template>
  <div class="area-board">
    <div class="row h-10">
      <div class="w-10 bg-red">T2:L2</div>
      <player-discard-top class="w-30 bg-blue"></player-discard-top>
      <div class="w-10 bg-brown">T2L8</div>
    </div>

    <div class="row h-30">
      <player-discard-left class="w-10 bg-blue"></player-discard-left>
      <div class="w-30 bg-red column flex-center"><div>text</div></div>
      <player-discard-right class="w-10 bg-blue"></player-discard-right>
    </div>

    <div class="row h-10">
      <div class="w-10 bg-red">T2:L2</div>
      <player-discard-bottom class="w-30 bg-blue"></player-discard-bottom>
      <div class="w-10 bg-brown">T2L8</div>
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
