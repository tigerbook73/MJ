<template>
  <q-page class="row justify-between">
    <div class="col-3 q-ma-md column">
      <q-btn to="/">Home</q-btn>

      <div class="q-my-md text-h6">{{ socketState.connected ? "Connected" : "Disconnected" }}</div>
      <div class="class q-gutter-md">
        <q-btn @click="listClient">List Client</q-btn>
        <q-btn @click="listRoom">List Room</q-btn>
        <q-btn @click="signIn">Sign In</q-btn>
        <q-btn @click="listUser">List User</q-btn>
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
interface RequestRecord {
  time: string;
  request: GameRequest;
}

interface ResponseRecord {
  time: string;
  response: GameResponse;
}
</script>

<script setup lang="ts">
import dayjs from "dayjs";
import { GameRequest, GameRequestType, GameResponse, ListRoomRequest } from "src/common/protocols/apis.models";
import { socket, socketSend, onSocketReceive, socketState, socketSendAndWait } from "src/websocket/socket";
import { ref } from "vue";

defineOptions({
  name: "ClientPage",
});

const requestList = ref([] as RequestRecord[]);
const responseList = ref([] as ResponseRecord[]);

function sendRequest(request: GameRequest): void {
  if (socket.connected) {
    socketSend(request);
    requestList.value.unshift({ time: dayjs().format("YYYY-MM-DD HH:mm:ss SSS"), request: request });
  }
}
sendRequest({
  type: GameRequestType.LIST_CLIENT,
});

async function sendRequestAndWait(request: GameRequest): Promise<void> {
  requestList.value.unshift({ time: dayjs().format("YYYY-MM-DD HH:mm:ss SSS"), request: request });
  const response = await socketSendAndWait(request);
  responseList.value.unshift({ time: dayjs().format("YYYY-MM-DD HH:mm:ss SSS"), response: response });
}

function listClient() {
  sendRequestAndWait({
    type: GameRequestType.LIST_CLIENT,
  });
}

async function listRoom() {
  const request: ListRoomRequest = {
    type: GameRequestType.LIST_ROOM,
  };
  sendRequestAndWait(request);
}

function signIn() {
  sendRequestAndWait({
    type: GameRequestType.SIGN_IN,
    data: {
      email: "admin@hello.com",
      password: "admin",
    },
  });
}

function listUser() {
  sendRequestAndWait({
    type: GameRequestType.LIST_USER,
  });
}

// function resetGame() {}
// function startGame() {}

onSocketReceive((data: GameResponse) => {
  responseList.value.unshift({ time: dayjs().format("YYYY-MM-DD HH:mm:ss SSS"), response: data });
});
</script>
