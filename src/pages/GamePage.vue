<template>
  <q-page class="row flex-center">
    <game-area class="w-90 h-90"></game-area>
    <q-btn @click="joinGame">Join Game</q-btn>
    <q-inner-loading :showing="mjStore.paused">
      <q-btn @click="resume" size="xl" flat>resume</q-btn>
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import GameArea from "components/GameArea.vue";
import { mjGame } from "src/core/mjGame";
import { useMjStore } from "src/stores/mj-store";
// import { userStore } from "src/stores/user-store";
import { useRouter } from "vue-router";

defineOptions({
  name: "IndexPage",
});

const mjStore = useMjStore();
// const user = userStore();
const router = useRouter();

function resume() {
  mjGame.resume();
  mjStore.refresh();
}

function joinGame() {
  router.push("/join-game");
}
</script>
