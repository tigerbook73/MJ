<template>
  <q-page class="row flex-center q-gutter-md">
    <q-card class="room column">
      <!-- top -->
      <div class="col-3">
        <div class="row full-height">
          <div class="col-3"></div>
          <q-btn flat class="col-6 bg-blue-4" :label="player1" @click="Join(1)"></q-btn>
          <div class="col-3"></div>
        </div>
      </div>

      <!-- center -->
      <div class="col-6">
        <div class="row full-height">
          <q-btn flat position="left" class="col-3 bg-blue-4" :label="player2" @click="Join(2)"></q-btn>
          <div class="col-6 bg-green-4 row flex-center"><div>ROOM</div></div>
          <q-btn flat position="right" class="col-3 bg-blue-4" :label="player3" @click="Join(3)"></q-btn>
        </div>
      </div>

      <!-- bottom -->
      <div class="col-3">
        <div class="row full-height">
          <div class="col-3"></div>
          <q-btn flat position="bottom" class="col-6 bg-blue-4" :label="player4" @click="Join(4)"></q-btn>
          <div class="col-3"></div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { userStore } from "src/stores/user-store";
import { ref } from "vue";
// import { useRouter } from "vue-router";
import { wait } from "src/utils/timer";
defineOptions({
  name: "GameRoom",
});

const userstore = userStore();
// const router = useRouter();

const player1 = ref("Player 1");
const player2 = ref("Player 2");
const player3 = ref("Player 3");
const player4 = ref("Player 4");

async function Join(player: number) {
  const username = userstore.username;

  switch (player) {
    case 1:
      player1.value = username + "(North)";
      break;
    case 2:
      player2.value = username + "(West)";
      break;
    case 3:
      player3.value = username + "(East)";
      break;
    case 4:
      player4.value = username + "(South)";
      break;
  }
  await wait(1000);
  // router.push("/game-page");
}
</script>

<style lang="scss">
.room {
  width: 400px;
  height: 400px;
  background-color: white;
}
</style>
