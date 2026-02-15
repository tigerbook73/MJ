<template>
  <div class="column bg-green-5">
    <!-- top -->
    <div class="col-3 row flex-center">
      <q-space />
      <q-chip size="1.2em">
        <div class="rotate-180">{{ topLabel }}</div>
      </q-chip>
      <q-space />
    </div>

    <!-- center -->
    <div class="col-6 row flex-center">
      <div class="col-3 row flex-center">
        <q-chip size="1.2em">
          <div class="rotate-90">{{ leftLabel }}</div>
        </q-chip>
      </div>
      <div class="col row flex-center">
        <q-btn v-if="btnCommand === 'start'" color="dark" @click="handleStart">Start</q-btn>
        <q-btn v-else color="dark" @click="handleReset">Reset</q-btn>
      </div>
      <div class="col-3 row flex-center">
        <q-chip size="1.2em">
          <div class="rotate-270">{{ rightLabel }}</div>
        </q-chip>
      </div>
    </div>

    <!-- bottom -->
    <div class="col-3 row flex-center">
      <q-space />
      <q-chip size="1.2em">{{ bottomLabel }}</q-chip>
      <q-space />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameState, Position } from "@mj/shared";
import { useExampleStore } from "../stores/example-store";
import { CommonUtil, Direction } from "../common/common";
import { computed } from "vue";
import { socketClient } from "src/client/socket-client";
import { useQuasar } from "quasar";

const $q = useQuasar();
const exampleStore = useExampleStore();

// direction labels
const topLabel = CommonUtil.positionToText(
  CommonUtil.mapPosition(exampleStore.currentPosition ?? Position.East, Direction.Top),
);
const bottomLabel = CommonUtil.positionToText(
  CommonUtil.mapPosition(exampleStore.currentPosition ?? Position.East, Direction.Bottom),
);
const leftLabel = CommonUtil.positionToText(
  CommonUtil.mapPosition(exampleStore.currentPosition ?? Position.East, Direction.Left),
);
const rightLabel = CommonUtil.positionToText(
  CommonUtil.mapPosition(exampleStore.currentPosition ?? Position.East, Direction.Right),
);

// command buttons
const btnCommand = computed(() => {
  const game = exampleStore.currentGame;
  if (!game) {
    return "";
  }

  const commandMap = {
    [GameState.Init]: "start",
    [GameState.Dispatching]: "reset",
    [GameState.WaitingAction]: "reset",
    [GameState.WaitingPass]: "reset",
    [GameState.End]: "reset",
  };
  return commandMap[game.state] || "reset";
});

function handleStart() {
  try {
    socketClient.startGame();
  } catch (e) {
    $q.notify({
      message: "Game start failed",
      color: "negative",
      icon: "warning",
    });
    console.error("Game start failed", e);
  }
}

function handleReset() {
  try {
    socketClient.resetGame();
  } catch (e) {
    $q.notify({
      message: "Game reset failed",
      color: "negative",
      icon: "warning",
    });
    console.error("Game reset failed", e);
  }
}
</script>
