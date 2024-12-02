<template>
  <q-page class="row justify-between">
    <div class="col-3 q-ma-md column">
      <q-btn to="/">Home</q-btn>

      <div class="q-my-md text-h6">{{ socketState.connected ? "Connected" : "Disconnected" }}</div>
      <div class="class q-gutter-md">
        <q-btn @click="listClient">List Client</q-btn>
        <q-btn @click="listRoom">List Room</q-btn>
        <q-btn @click="SignIn">Sign In</q-btn>
        <q-btn @click="ListUser">List User</q-btn>
      </div>
    </div>
    <q-separator vertical />
    <div class="col column">
      <!-- request -->
      <q-item>
        <q-item-section>Request</q-item-section>
        <q-btn @click="requestList = []" dense>Clean</q-btn>
      </q-item>
      <q-scroll-area class="col">
        <q-list bordered>
          <q-expansion-item
            v-for="request in requestList"
            :key="request.time"
            expand-separator
            :label="request.time + ' > ' + request.request.type"
            dense
          >
            <q-input
              type="textarea"
              :model-value="JSON.stringify(request.request, null, 2)"
              autogrow
              dense
              readonly
              class="q-ml-lg"
            ></q-input>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>

      <q-separator></q-separator>

      <!-- response or event -->
      <q-item>
        <q-item-section>Response</q-item-section>
        <q-btn @click="responseList = []" dense>Clean</q-btn>
      </q-item>
      <q-scroll-area class="col">
        <q-list bordered>
          <q-expansion-item
            v-for="response in responseList"
            :key="response.time"
            expand-separator
            :label="response.time + ' > ' + response.response.type"
            dense
          >
            <q-input
              type="textarea"
              :model-value="JSON.stringify(response.response, null, 2)"
              autogrow
              readonly
              dense
              class="q-ml-lg"
            ></q-input>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script lang="ts">
interface Request {
  type: string;
  data?: unknown;
}

interface RequestRecord {
  time: string;
  request: Request;
}

interface Response {
  type: string;
  status: string;
  message?: string;
  data?: object;
}

interface ResponseRecord {
  time: string;
  response: Response;
}
</script>

<script setup lang="ts">
import dayjs from "dayjs";
import { socket, socketSend, onSocketReceive, socketState } from "src/websocket/socket";
import { ref } from "vue";

defineOptions({
  name: "ClientPage",
});

const requestList = ref([] as RequestRecord[]);
const responseList = ref([] as ResponseRecord[]);

function sendRequest(request: Request) {
  if (socket.connected) {
    socketSend(request);
    requestList.value.unshift({ time: dayjs().format("YYYY-MM-DD HH:mm:ss SSS"), request });
  }
}

function listClient() {
  sendRequest({
    type: "listClient",
  });
}

function listRoom() {
  sendRequest({
    type: "listRoom",
  });
}
function SignIn() {
  sendRequest({
    type: "signIn",
    data: {
      email: "helloworld@gg.com",
      password: "AAbb1234",
    },
  });
}
// function resetGame() {}
// function startGame() {}
function ListUser() {
  sendRequest({
    type: "listUser",
  });
}
onSocketReceive((data) => {
  responseList.value.unshift({ time: dayjs().format("YYYY-MM-DD HH:mm:ss SSS"), response: data as Response });
});
</script>
