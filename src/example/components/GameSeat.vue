<template>
  <div class="column flex-center" :class="positionClass">
    <q-tooltip anchor="top middle" self="top left"> Double click to TAKE or LEAVE the seat </q-tooltip>
    <q-chip size="1rem" icon="chair" :label="positionName"> </q-chip>
    <div>{{ props.player.userName }}</div>
  </div>
</template>

<script lang="ts">
export interface GameSeatProp extends PlayerModel {}
</script>

<script setup lang="ts">
import { Position } from "src/common/core/mj.game";
import { PlayerModel } from "src/common/models/player.model";
import { computed } from "vue";
import { useExampleStore } from "../stores/example-store";

const exampleStore = useExampleStore();

const positionName = computed(() => {
  const posMap = {
    [Position.East]: "東",
    [Position.West]: "西",
    [Position.North]: "北",
    [Position.South]: "南",
  };
  return posMap[props.player.position];
});

const positionClass = computed(() => {
  const highlighted =
    props.player.roomName === exampleStore.currentRoom?.name && props.player.position === exampleStore.currentPosition;
  return { "bg-yellow-3": highlighted, "bg-brown-3": !highlighted };
});

const props = defineProps<{ player: GameSeatProp }>();
</script>
