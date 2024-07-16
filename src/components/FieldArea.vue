<template>
  <div class="area-board">
    <div class="row h-10">
      <div class="w-10 bg-red">T2:L2</div>
      <div class="w-30 bg-blue"></div>
      <div class="w-10 bg-brown">T2L8</div>
    </div>

    <div class="row h-30">
      <div class="w-10 bg-blue"></div>
      <div class="w-30 bg-red column flex-center"><div>text</div></div>
      <div class="w-10 bg-purple"></div>
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

defineOptions({
  name: "FieldArea",
});
</script>
