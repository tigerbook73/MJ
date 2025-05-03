<template>
  <div class="column flex-center bg-brown-3">
    <div>{{ positionName }}</div>
    <div>{{ props.player.userName }}</div>
  </div>
</template>

<script lang="ts">
export interface GamePlayerProp extends PlayerModel {}
</script>

<script setup lang="ts">
import { Position } from "src/common/core/mj.game";
import { PlayerModel } from "src/common/models/player.model";
import { computed } from "vue";

const positionName = computed(() => {
  const posMap = {
    [Position.East]: "東",
    [Position.West]: "西",
    [Position.North]: "北",
    [Position.South]: "南",
  };
  return posMap[props.player.position];
});

const props = defineProps<{ player: GamePlayerProp }>();
</script>
