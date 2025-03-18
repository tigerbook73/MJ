<template>
  <q-page class="row flex-center">
    <game-area class="w-90 h-90"></game-area>
    <div class="column flex-center">
      <q-btn @click="initGame">Init Game</q-btn>
      <q-btn @click="startGame">Start Game</q-btn>
      <q-btn @click="resetGame">Reset Game</q-btn>
      <q-btn @click="drop">Drop Card</q-btn>
      <q-btn @click="passPlayer(Position.East)">Pass East</q-btn>
      <q-btn @click="passPlayer(Position.South)">Pass South</q-btn>
      <q-btn @click="passPlayer(Position.West)">Pass West</q-btn>
      <q-btn @click="passPlayer(Position.North)">Pass North</q-btn>
      <q-btn @click="zimo">zimo</q-btn>
    </div>
    <!-- <q-inner-loading :showing="mjStore.paused">
      <q-btn @click="resume" size="xl" flat>resume</q-btn>
    </q-inner-loading> -->
  </q-page>
</template>

<script setup lang="ts">
import GameArea from "components/GameArea.vue";
import { useQuasar } from "quasar";
import { GameState, Position } from "src/common/core/mj.game";
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";
// import { mjGame } from "src/core/mjGame";
// import { userStore } from "src/stores/user-store";
// import { useRouter } from "vue-router";

defineOptions({
  name: "IndexPage",
});

const mjStore = useMjStore();
const $q = useQuasar();
// const user = userStore();
// const router = useRouter();

// function resume() {
//   mjGame.resume();
//   mjStore.refresh();
// }

mjGame;
mjGame.init([Position.East, Position.North, Position.West, Position.South]);

function tryCall(fn: () => void) {
  try {
    fn();
  } catch (e: any) {
    $q.notify({
      message: e.message,
    });
  }
}

function initGame() {
  tryCall(() => {
    mjGame.init([Position.East, Position.North, Position.West, Position.South]);
    mjStore.refresh();
  });
}

function resetGame() {
  tryCall(() => {
    mjGame.init([Position.East, Position.North, Position.West, Position.South]);
    mjStore.refresh();
  });
}

function startGame() {
  tryCall(() => {
    mjGame.start();
    mjStore.refresh();
  });
}

function drop() {
  tryCall(() => {
    if (!mjGame.current) {
      $q.notify({
        message: "Please start game first",
        color: "negative",
      });
      return;
    }
    mjGame.drop(mjGame.current.picked);
    mjStore.refresh();
  });
}

function passPlayer(position: Position) {
  tryCall(() => {
    if (!mjGame.current) {
      $q.notify({ message: "Please start game first" });
      return;
    }

    if (mjGame.state !== GameState.WaitingPass) {
      $q.notify({ message: "game state is not waiting pass" });
      return;
    }

    const player = mjGame.players.find((p) => p?.position === position);
    if (!player) {
      $q.notify({ message: "Can't find position" });
      return;
    }

    mjGame.pass(player);
    mjStore.refresh();
  });
}

function zimo() {
  tryCall(() => {
    if (!mjGame.current) {
      $q.notify({ message: "Please start game first", color: "negative" });
      return;
    }
    mjGame.zimo();
    mjStore.refresh();
  });
}
</script>
