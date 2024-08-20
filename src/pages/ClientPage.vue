<template>
  <q-page class="row justify-between">
    <div class="col-3 q-ma-md column">
      <q-btn to="/" class="q-ma-md">Home</q-btn>

      <div class="q-my-md text-h5">{{ socketState.connected ? "Connected" : "Disconnected" }}</div>
      <div class="q-my-md">
        <q-btn @click="joinGame">join Game</q-btn>
      </div>
      <div class="q-my-md">
        <q-btn @click="leaveGame">Leave Game</q-btn>
      </div>
    </div>
    <q-separator vertical />
    <div class="col column">
      <q-input v-model="message" type="textarea" class="col-12" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { socket, socketSend, onSocketReceive, socketState } from "src/websocket/socket";
import { ref } from "vue";

defineOptions({
  name: "ClientPage",
});

const message = ref("hello\nworld\n");

function joinGame() {
  if (socket.connected) {
    const request = {
      type: "joinGame",
      data: {
        game: "default",
        position: "random",
        player: `player ${Math.floor(Math.random() * 10)}`,
      },
    };
    socketSend(request);
    message.value += " => \n" + JSON.stringify(request) + "\n";
  }
}

function leaveGame() {
  if (socket.connected) {
    const request = {
      type: "leaveGame",
      data: {
        game: "default",
        player: "",
      },
    };
    socketSend(request);
    message.value += " => \n" + JSON.stringify(request) + "\n";
  }
}

// function resetGame() {}
// function startGame() {}

onSocketReceive((data) => {
  message.value += " <= \n" + JSON.stringify(data) + "\n";
});
</script>
