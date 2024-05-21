<template>
  <div class="area-board">
    <div class="row h-16">
      <div class="w-16 bg-red">T2:L2</div>
      <div class="w-18 bg-blue"></div>
      <div class="w-16 bg-red">T2L8</div>
    </div>

    <div class="row h-18">
      <div class="w-16 bg-blue"></div>
      <div class="w-18 bg-green column flex-center"><div>text</div></div>
      <div class="w-16 bg-blue"></div>
    </div>

    <div class="row h-16">
      <div class="w-16 bg-red">T2:L2</div>
      <div class="w-18 bg-blue"></div>
      <div class="w-16 bg-red">T2L8</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "FieldArea",
});
</script>
