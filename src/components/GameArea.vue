<template>
  <div class="column area-game">
    <!-- top -->
    <div class="row h-10">
      <game-area-a class="w-10"></game-area-a>
      <player-area-top class="w-70"></player-area-top>
      <game-area-b class="w-10"></game-area-b>
    </div>

    <!-- center -->
    <div class="row h-70">
      <player-area-left class="w-10"></player-area-left>
      <board-area class="w-70"></board-area>
      <player-area-right class="w-10"></player-area-right>
    </div>

    <!-- bottom -->
    <div class="row h-10">
      <game-area-c class="w-10"></game-area-c>
      <player-area-bottom class="w-70"></player-area-bottom>
      <game-area-d class="w-10"></game-area-d>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GameArea",
});

import BoardArea from "components/BoardArea.vue";
import GameAreaA from "components/GameAreaA.vue";
import GameAreaB from "components/GameAreaB.vue";
import GameAreaC from "components/GameAreaC.vue";
import GameAreaD from "components/GameAreaD.vue";
import PlayerAreaBottom from "components/PlayerAreaBottom.vue";
import PlayerAreaLeft from "components/PlayerAreaLeft.vue";
import PlayerAreaRight from "components/PlayerAreaRight.vue";
import PlayerAreaTop from "components/PlayerAreaTop.vue";
</script>
