<template>
  <q-page class="row">
    <div class="col-4 q-ma-md">
      <div class="row items-stretch">
        <div class="text-h5">{{ connected ? "Connected" : "Disconnected" }}</div>
        <q-space />
        <div><q-btn to="/" no-caps>Home</q-btn></div>
      </div>

      <q-separator class="q-my-md" />

      <div>
        <!-- list client -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="listClient" no-caps>List Client</q-btn>
          </div>
        </div>

        <!-- sign in -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-input v-model="email" label="Email" class="col" dense outlined />
          <q-input v-model="password" label="Password" class="col" dense outlined />
          <div class="col-3">
            <q-btn class="fit" dense @click="signIn" no-caps>Sign In</q-btn>
          </div>
        </div>

        <!-- sign out -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="signOut" no-caps>Sign Out</q-btn>
          </div>
        </div>

        <!-- list room -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="listRoom" no-caps>List Room</q-btn>
          </div>
        </div>

        <!-- join room -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-input v-model="roomName" label="Room Name" dense outlined />
          <q-select
            v-model="position"
            label="Position"
            class="col"
            dense
            outlined
            :options="[Position.East, Position.South, Position.West, Position.North]"
          />
          <div class="col-3">
            <q-btn class="fit" dense @click="joinRoom" no-caps>Join Room</q-btn>
          </div>
        </div>

        <!-- leave room -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-input v-model="leaveRoomName" label="Room Name" dense outlined />
          <div class="col-3">
            <q-btn class="fit" dense @click="leaveRoom" no-caps>Leave Room</q-btn>
          </div>
        </div>

        <!-- enter game -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-input v-model="enterGameRoomName" label="Room Name" dense outlined />
          <div class="col-3">
            <q-btn class="fit" dense @click="enterGame" no-caps>Enter Game</q-btn>
          </div>
        </div>

        <!-- quit game -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-input v-model="quitGameRoomName" label="Room Name" dense outlined />
          <div class="col-3">
            <q-btn class="fit" dense @click="quitGame" no-caps>Quit Game</q-btn>
          </div>
        </div>
      </div>
    </div>

    <q-separator vertical />

    <div class="col column">
      <!-- Messages -->
      <q-item>
        <q-item-section>Messages</q-item-section>
        <q-btn @click="messageList = []" dense no-caps>Clean</q-btn>
      </q-item>
      <q-scroll-area class="col">
        <q-list bordered>
          <q-expansion-item
            v-for="message in messageList"
            :key="message.label"
            expand-separator
            :label="message.label"
            dense
          >
            <div v-if="message.request" class="q-pl-lg">
              <div>=></div>
              <q-input type="textarea" :model-value="message.request" autogrow dense readonly></q-input>
            </div>
            <div v-if="message.response" class="q-pl-lg">
              <div>&lt;=</div>
              <q-input type="textarea" :model-value="message.response" autogrow dense readonly></q-input>
            </div>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>

      <q-separator></q-separator>
    </div>
  </q-page>
</template>

<script lang="ts">
class MessageRecord {
  type: string;
  label: string = "";
  request_time: string | null;
  request: any | null;
  response_time: string | null;
  response: any | null;

  constructor(
    type: string,
    request_time: string | null,
    request: any,
    response_time: string | null,
    response: any | null,
  ) {
    this.type = type;
    this.request_time = request_time;
    this.request = request;
    this.response_time = response_time;
    this.response = response;
  }

  getTimeLabel() {
    return this.request_time || this.response_time || "N/A";
  }

  getTypeLabel() {
    return this.type || "N/A";
  }

  getLabel() {
    let label = this.getTimeLabel() + " - " + this.getTypeLabel();
    if (this.request && !this.response) {
      label += "...";
    }
    return label;
  }

  refreshLabel() {
    this.label = this.getLabel();
  }
}
</script>

<script setup lang="ts">
import dayjs from "dayjs";
import { clientApi } from "src/client/client-api";
import { Position } from "src/common/core/mj.game";
import {
  GameRequestType,
  GameResponse,
  JoinRoomRequest,
  LeaveRoomRequest,
  ListClientRequest,
  ListRoomRequest,
  SignInRequest,
  SignOutRequest,
} from "src/common/protocols/apis.models";
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

const messageList = ref([] as MessageRecord[]);

function appendMessage(type: string, request: any | null, response: any | null): MessageRecord {
  const message = new MessageRecord(
    type,
    request ? dayjs().format("YYYY-MM-DD HH:mm:ss SSS") : null,
    request ? JSON.stringify(request, null, 2) : null,
    response ? dayjs().format("YYYY-MM-DD HH:mm:ss SSS") : null,
    response ? JSON.stringify(response, null, 2) : null,
  );
  message.refreshLabel();
  messageList.value.unshift(message);
  return message;
}

function updateMessage(message: MessageRecord, request: any | null, response: any | null): void {
  if (request) {
    message.request = request ? JSON.stringify(request, null, 2) : null;
    message.request_time = dayjs().format("YYYY-MM-DD HH:mm:ss SSS");
  }
  if (response) {
    message.response = response ? JSON.stringify(response, null, 2) : null;
    message.response_time = dayjs().format("YYYY-MM-DD HH:mm:ss SSS");
  }
  message.refreshLabel();
  messageList.value = [...messageList.value];
}

clientApi.gameSocket.onReceive((response: GameResponse) => {
  appendMessage(response.type, null, response.data);
});

// list client
async function listClient() {
  const request: ListClientRequest = {
    type: GameRequestType.LIST_CLIENT,
    data: {},
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.listClient();
    updateMessage(message, null, data);
  } catch (error: any) {
    updateMessage(message, null, { message: error.message });
  }
}

// sign in
const email = ref("player1@gmail.com");
const password = ref("123456");
async function signIn() {
  const request: SignInRequest = {
    type: GameRequestType.SIGN_IN,
    data: {
      email: email.value,
      password: password.value,
    },
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.signIn(request.data.email, request.data.password);
    updateMessage(message, null, data);
  } catch (error: any) {
    updateMessage(message, null, { message: error.message });
  }
}

// sign out
async function signOut() {
  const request: SignOutRequest = {
    type: GameRequestType.SIGN_OUT,
    data: {},
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.signOut();
    updateMessage(message, null, {});
  } catch (error: any) {
    updateMessage(message, null, { message: error.message });
  }
}

// list room
async function listRoom() {
  const request: ListRoomRequest = {
    type: GameRequestType.LIST_ROOM,
    data: {},
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.listRoom();
    updateMessage(message, null, data);
  } catch (error: any) {
    updateMessage(message, null, { message: error.message });
  }
}

// join room
const roomName = ref("room-1");
const position = ref(Position.North);
async function joinRoom() {
  const request: JoinRoomRequest = {
    type: GameRequestType.JOIN_ROOM,
    data: {
      roomName: roomName.value,
      position: position.value,
    },
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.joinRoom(request.data.roomName, request.data.position);
    updateMessage(message, null, data);
  } catch (error: any) {
    updateMessage(message, null, { message: error.message });
  }
}

// leave room
const leaveRoomName = ref("room-1");

async function leaveRoom() {
  const request: LeaveRoomRequest = {
    type: GameRequestType.LEAVE_ROOM,
    data: {
      roomName: leaveRoomName.value,
    },
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.leaveRoom(request.data.roomName);
    updateMessage(message, null, data);
  } catch (error: any) {
    updateMessage(message, null, { message: error.message });
  }
}

// enter game
const enterGameRoomName = ref("room-1");

async function enterGame() {
  const request = {
    type: GameRequestType.ENTER_GAME,
    data: {
      roomName: enterGameRoomName.value,
    },
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.enterGame(request.data.roomName);
    updateMessage(message, null, data);
  } catch (error: any) {
    updateMessage(message, null, { message: error.message });
  }
}

// quit game
const quitGameRoomName = ref("room-1");

async function quitGame() {
  const request = {
    type: GameRequestType.QUIT_GAME,
    data: {
      roomName: quitGameRoomName.value,
    },
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.quitGame(request.data.roomName);
    updateMessage(message, null, data);
  } catch (error: any) {
    updateMessage(message, null, { message: error.message });
  }
}
</script>
