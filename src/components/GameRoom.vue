<template>
  <q-card class="room column">
    <!-- top -->
    <div class="col-3">
      <div class="row full-height">
        <div class="col-3"></div>
        <q-btn flat class="col-6 bg-blue-4" :label="player1" @click="Join('North')" :disable="isJoined"></q-btn>
        <div class="col-3"></div>
      </div>
    </div>

    <!-- center -->
    <div class="col-6">
      <div class="row full-height">
        <q-btn
          flat
          position="left"
          class="col-3 bg-blue-4"
          :label="player2"
          @click="Join('West')"
          :disable="isJoined"
        ></q-btn>
        <div class="col-6 bg-green-4 row flex-center">
          <div>{{ roomName }}</div>
        </div>
        <q-btn
          flat
          position="right"
          class="col-3 bg-blue-4"
          :label="player3"
          @click="Join('East')"
          :disable="isJoined"
        ></q-btn>
      </div>
    </div>

    <!-- bottom -->
    <div class="col-3">
      <div class="row full-height">
        <div class="col-3"></div>
        <q-btn
          flat
          position="bottom"
          class="col-6 bg-blue-4"
          :label="player4"
          @click="Join('South')"
          :disable="isJoined"
        ></q-btn>
        <div class="col-3"></div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { wait } from "src/utils/timer";
import { userStore } from "src/stores/user-store";
import { mjGame } from "src/core/mjGame";
import { useRouter } from "vue-router";

const props = defineProps({
  roomName: {
    type: String,
    required: true,
  },
  isJoined: {
    type: Boolean,
    required: true,
  },
});

const userstore = userStore();
const router = useRouter();

const emit = defineEmits(["joinRoom"]);

const player1 = ref("Player 1");
const player2 = ref("Player 2");
const player3 = ref("Player 3");
const player4 = ref("Player 4");

async function Join(position: string) {
  if (props.isJoined) return;

  const username = userstore.username;
  // 根据选择的位置将玩家绑定到具体的方向
  switch (position) {
    case "North":
      player1.value = `${username} (North)`; // 更新 UI
      mjGame.setPlayer("North", username); // 设置 North 的玩家
      break;
    case "West":
      player2.value = `${username} (West)`; // 更新 UI
      mjGame.setPlayer("West", username); // 设置 West 的玩家
      break;
    case "East":
      player3.value = `${username} (East)`; // 更新 UI
      mjGame.setPlayer("East", username); // 设置 East 的玩家
      break;
    case "South":
      player4.value = `${username} (South)`; // 更新 UI
      mjGame.setPlayer("South", username); // 设置 South 的玩家
      break;
  }

  emit("joinRoom");
  await wait(1000);
  router.push("/game-page");
}
</script>

<style lang="scss">
.room {
  width: 400px;
  height: 400px;
  background-color: white;
}
</style>
