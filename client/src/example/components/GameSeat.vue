<template>
  <div class="column flex-center" :class="seatClass">
    <q-tooltip anchor="top middle" self="top left"> Double click to TAKE or LEAVE the seat </q-tooltip>
    <q-chip size="1rem" icon="chair" :label="positionName"> </q-chip>
    <div>{{ props.player.userName }}</div>
  </div>
</template>

<script lang="ts">
export type GameSeatProp = PlayerModel;
</script>

<script setup lang="ts">
import type { PlayerModel } from "@common/models/player.model";
import { computed } from "vue";
import { useExampleStore } from "../stores/example-store";
import { UserType } from "@common/models/common.types";
import { CommonUtil } from "../common/common";

const props = defineProps<{ player: GameSeatProp }>();

const exampleStore = useExampleStore();

const positionName = CommonUtil.positionToText(props.player.position);

const seatClass = computed(() => {
  const highlighted =
    props.player.roomName === exampleStore.currentRoom?.name && props.player.position === exampleStore.currentPosition;
  const isHuman = props.player.type === UserType.Human;
  return {
    //
    "bg-yellow-3": highlighted,
    "bg-blue-5": !highlighted && isHuman,
    "bg-brown-3": !isHuman,
  };
});
</script>
