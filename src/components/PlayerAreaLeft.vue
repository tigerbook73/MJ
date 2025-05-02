<template>
  <div class="row flex-center">
    <comp-tile :type="tile" class="movearea" :style="style"></comp-tile>
  </div>
  <div>
    <q-btn @click="animation">click</q-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMjStore } from "src/stores/mj-store";
import CompTile from "./CompTile.vue";

defineOptions({
  name: "PlayerAreaLeft",
});

const userMj = useMjStore();

const tile = computed(() => userMj.myTiles[0]);

const style = ref({
  position: "relative",
  left: "0px",
  top: "0px",
});

function animation() {
  //
  style.value = {
    position: "relative",
    left: "100px",
    top: "100px",
  };

  setTimeout(() => {
    style.value = {
      position: "relative",
      left: "0px",
      top: "0px",
    };
  }, 1000);
}
</script>

<style scoped>
.movearea {
  transition: 0.3s position ease;
  transition: 0.3s top ease;
}
</style>
