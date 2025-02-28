<template>
  <q-page class="row justify-between">
    <div class="col-3 q-ma-md column">
      <q-btn to="/">Home</q-btn>

      <div class="q-my-md text-h6">{{ connected ? "Connected" : "Disconnected" }}</div>
      <div class="row q-gutter-sm">
        <q-btn dense @click="signIn">Sign In</q-btn>
        <q-btn dense @click="signOut">Sign Out</q-btn>
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
  request: {
    type: GameRequestType;
    data?: unknown;
  };
}

interface ResponseRecord {
  time: string;
  response: {
    type: GameRequestType;
    data?: unknown;
  };
}
</script>

<script setup lang="ts">
import dayjs from "dayjs";
import { clientApi } from "src/client/client-api";
import { GameRequestType, GameResponse } from "src/common/protocols/apis.models";
import { ref } from "vue";

defineOptions({
  name: "ClientPage",
});

const connected = ref(clientApi.gameSocket.connected);
clientApi.gameSocket.onConnect(() => {
  connected.value = true;
});
clientApi.gameSocket.onDisconnect(() => {
  connected.value = false;
});

const requestList = ref([] as RequestRecord[]);
const responseList = ref([] as ResponseRecord[]);

function updateRequest(type: GameRequestType, data: unknown): void {
  requestList.value.unshift({ time: dayjs().format("YYYY-MM-DD HH:mm:ss SSS"), request: { type, data } });
}

function updateResponse(type: GameRequestType, data: unknown): void {
  responseList.value.unshift({ time: dayjs().format("YYYY-MM-DD HH:mm:ss SSS"), response: { type, data } });
}

clientApi.gameSocket.onReceive((data: GameResponse) => {
  updateResponse(data.type, data.data);
});

/**
 * sign in
 */
const email = ref("player1@gmail.com");
const password = ref("123456");

async function signIn() {
  const request = {
    email: email.value,
    password: password.value,
  };
  updateRequest(GameRequestType.SIGN_IN, request);
  const data = await clientApi.signIn(request.email, request.password);
  updateResponse(GameRequestType.SIGN_IN, data);
}

async function signOut() {
  updateRequest(GameRequestType.SIGN_OUT, {});
  const data = await clientApi.signOut();
  updateResponse(GameRequestType.SIGN_OUT, data);
}

async function listClient() {
  updateRequest(GameRequestType.LIST_CLIENT, {});
  const data = await clientApi.listClient();
  updateResponse(GameRequestType.LIST_CLIENT, data);
}

async function listRoom() {
  updateRequest(GameRequestType.LIST_ROOM, {});
  const data = await clientApi.listRoom();
  updateResponse(GameRequestType.LIST_ROOM, data);
}

async function listUser() {
  updateRequest(GameRequestType.LIST_USER, {});
  const data = await clientApi.listUser();
  updateResponse(GameRequestType.LIST_USER, data);
}
</script>
