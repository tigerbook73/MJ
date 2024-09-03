<template>
  <q-page class="row flex-center q-gutter-md">
    <q-card class="room column">
      <!-- top -->
      <div class="col-3">
        <div class="row full-height">
          <div class="col-3"></div>
          <q-btn flat class="col-6 bg-blue-4" label="Player1" @click="Join"></q-btn>
          <div class="col-3"></div>
        </div>
      </div>

      <!-- center -->
      <div class="col-6">
        <div class="row full-height">
          <q-btn flat position="left" class="col-3 bg-blue-4" label="Player2" @click="Join"></q-btn>
          <div class="col-6 bg-green-4 row flex-center"><div>ROOM</div></div>
          <q-btn flat position="right" class="col-3 bg-blue-4" label="Player3" @click="Join"></q-btn>
        </div>
      </div>

      <!-- bottom -->
      <div class="col-3">
        <div class="row full-height">
          <div class="col-3"></div>
          <q-btn flat position="bottom" class="col-6 bg-blue-4" label="Player4" @click="Join"></q-btn>
          <div class="col-3"></div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

defineOptions({
  name: "GameRoom",
});

const router = useRouter();

function Join() {
  router.push("/game-page");
}
</script>

<style lang="scss">
.room {
  width: 400px;
  height: 400px;
  background-color: aqua;
}
</style>
