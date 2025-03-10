<template>
  <q-page class="row">
    <div class="col-3 q-ma-md">
      <div class="row items-stretch items-center">
        <div class="text-h6">{{ connected ? "Connected" : "Disconnected" }}</div>
        <q-toggle v-model="showAllCommand" label="Show All Commands" />
        <q-space />
        <div><q-btn to="/" no-caps>Home</q-btn></div>
      </div>

      <q-separator class="q-my-md" />

      <div>
        <!-- list client -->
        <div v-show="showAllCommand" class="row justify-between q-col-gutter-md items-center q-mb-sm">
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
        <div v-show="showAllCommand" class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="signOut" no-caps>Sign Out</q-btn>
          </div>
        </div>

        <!-- list room -->
        <div v-show="showAllCommand" class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="listRoom" no-caps>List Room</q-btn>
          </div>
        </div>

        <!-- join room -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-input v-model="roomName" label="Room Name" dense outlined />
          <q-select
            v-model.number="position"
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
        <div v-show="showAllCommand" class="row justify-between q-col-gutter-md items-center q-mb-sm">
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

        <!--  quit game -->
        <div v-show="showAllCommand" class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-input v-model="quitGameRoomName" label="Room Name" dense outlined />
          <div class="col-3">
            <q-btn class="fit" dense @click="quitGame" no-caps>Quit Game</q-btn>
          </div>
        </div>

        <!-- start game -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="startGame" no-caps>Start Game</q-btn>
          </div>
        </div>

        <!-- reset game -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="resetGame" no-caps>Reset Game</q-btn>
          </div>
        </div>

        <!-- action drop -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-input v-model.number="tileToDrop" label="Tile ID" dense outlined />
          <div class="col-3">
            <q-btn class="fit" dense @click="actionDrop" no-caps>Drop</q-btn>
          </div>
        </div>

        <!-- action angang -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-input v-model="tilesToAnGang" label="Tile ID" dense outlined />
          <div class="col-3">
            <q-btn class="fit" dense @click="actionAngang" no-caps>暗杠</q-btn>
          </div>
        </div>

        <!-- action zimo -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="actionZimo" no-caps>自摸</q-btn>
          </div>
        </div>

        <!-- action chi -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="actionChi" no-caps>吃</q-btn>
          </div>
        </div>

        <!-- action pass -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="actionPass" no-caps>过</q-btn>
          </div>
        </div>

        <!-- action peng -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="actionPeng" no-caps>碰</q-btn>
          </div>
        </div>

        <!-- action gang -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="actionGang" no-caps>杠</q-btn>
          </div>
        </div>

        <!-- action hu -->
        <div class="row justify-between q-col-gutter-md items-center q-mb-sm">
          <q-space />
          <div class="col-3">
            <q-btn class="fit" dense @click="actionHu" no-caps>和</q-btn>
          </div>
        </div>
      </div>
    </div>

    <q-separator vertical />

    <div class="col column">
      <!-- Messages -->
      <q-item>
        <q-item-section>
          <div class="row q-gutter-md items-center">
            <q-btn-toggle v-model="mode" :options="modeOptions" />
            <q-toggle v-model="showEvent" label="Event" />
            <div class="bg-warning border">Pending</div>
            <div class="bg-positive border">Completed</div>
            <div class="bg-negative border">Failed</div>
          </div>
        </q-item-section>
        <q-btn @click="messageList = []" dense no-caps>Clean</q-btn>
      </q-item>

      <q-scroll-area class="col">
        <q-list v-show="mode === 'message'" bordered>
          <div v-for="message in messageList" :key="message.label">
            <q-expansion-item v-show="message.request || showEvent" expand-separator dense>
              <template v-slot:header>
                <q-item-section>
                  <q-item-label :class="message.getClass()">{{ message.label }}</q-item-label>
                </q-item-section>
              </template>
              <div v-if="message.request" class="q-pl-lg">
                <div>=></div>
                <q-input type="textarea" :model-value="message.request" autogrow dense readonly></q-input>
              </div>
              <div v-if="message.response" class="q-pl-lg">
                <div>&lt;=</div>
                <q-input type="textarea" :model-value="message.response" autogrow dense readonly></q-input>
              </div>
            </q-expansion-item>
          </div>
        </q-list>
        <GameCore v-show="mode === 'game'" :game="game as any" @drop="handleDrop" />
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
  state: "pending" | "completed" | "failed" = "completed";
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
    return this.getTimeLabel() + " - " + this.getTypeLabel();
  }

  refreshLabel() {
    this.label = this.getLabel();
  }

  setState(state: "pending" | "completed" | "failed") {
    this.state = state;
  }

  getClass() {
    return this.state === "pending" ? "text-warning" : this.state === "completed" ? "text-positive" : "text-negative";
  }
}
</script>

<script setup lang="ts">
import dayjs from "dayjs";
import { clientApi } from "src/client/client-api";
import { Game, Position } from "src/common/core/mj.game";
import { TileId } from "src/common/core/mj.tile-core";
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
import GameCore from "src/components/websocket/GameCore.vue";
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

const showAllCommand = ref(false);

const mode = ref("message");
const modeOptions = [
  { label: "Message", value: "message" },
  { label: "Game", value: "game" },
];

const messageList = ref([] as MessageRecord[]);
const showEvent = ref(false);

function appendMessage(type: string, request: any | null, response: any | null): MessageRecord {
  const message = new MessageRecord(
    type,
    request ? dayjs().format("YYYY-MM-DD HH:mm:ss SSS") : null,
    request ? JSON.stringify(request, null, 2) : null,
    response ? dayjs().format("YYYY-MM-DD HH:mm:ss SSS") : null,
    response ? JSON.stringify(response, null, 2) : null,
  );
  message.refreshLabel();

  if (!response) {
    message.setState("pending");
  } else {
    message.setState("completed");
  }
  messageList.value.unshift(message);
  return message;
}

function updateMessage(
  message: MessageRecord,
  response: any | null,
  state: "pending" | "completed" | "failed",
): MessageRecord {
  if (response) {
    message.response = response ? JSON.stringify(response, null, 2) : null;
    message.response_time = dayjs().format("YYYY-MM-DD HH:mm:ss SSS");
  }
  message.refreshLabel();
  message.setState(state);
  messageList.value = [...messageList.value];
  return message;
}

clientApi.gameSocket.onReceive((response: GameResponse) => {
  appendMessage(response.type, null, response.data);
});

const game = ref<Game | null>(null);

// list client
async function listClient() {
  const request: ListClientRequest = {
    type: GameRequestType.LIST_CLIENT,
    data: {},
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.listClient();
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
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
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
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
    updateMessage(message, {}, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
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
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
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
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
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
    updateMessage(message, {}, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
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
    game.value = data.game;
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
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
    updateMessage(message, {}, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
  }
}

async function startGame() {
  const request = {
    type: GameRequestType.START_GAME,
    data: {},
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.startGame();
    game.value = data;
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
  }
}

async function resetGame() {
  const request = {
    type: GameRequestType.RESET_GAME,
    data: {},
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.resetGame();
    game.value = data;
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
  }
}

const tileToDrop = ref<TileId>(-1);
async function actionDrop() {
  const request = {
    type: GameRequestType.ACTION_DROP,
    data: {
      tileId: tileToDrop.value == -1 ? game.value?.current?.picked || -1 : tileToDrop.value || -1,
    },
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.actionDrop(request.data.tileId);
    game.value = data;
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
  }
}

async function actionPass() {
  const request = {
    type: GameRequestType.ACTION_PASS,
    data: {},
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.actionPass();
    game.value = data;
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
  }
}

async function actionHu() {
  const request = {
    type: GameRequestType.ACTION_HU,
    data: {},
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.actionHu();
    game.value = data;
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
  }
}

async function actionZimo() {
  const request = {
    type: GameRequestType.ACTION_ZIMO,
    data: {},
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.actionZimo();
    game.value = data;
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
  }
}

const tileToChi = ref<string>("-1,-1");
async function actionChi() {
  const request = {
    type: GameRequestType.ACTION_CHI,
    data: {
      tileIds: tileToChi.value.split(",").map((tileId) => parseInt(tileId)) as [TileId, TileId],
    },
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.actionChi(request.data.tileIds);
    game.value = data;
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
  }
}

const tileToPeng = ref<string>("-1,-1");
async function actionPeng() {
  const request = {
    type: GameRequestType.ACTION_PENG,
    data: {
      tileIds: tileToPeng.value.split(",").map((tileId) => parseInt(tileId)) as [TileId, TileId],
    },
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.actionPeng(request.data.tileIds);
    game.value = data;
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
  }
}

const tilesToAnGang = ref<string>("-1,-1,-1,-1");
async function actionAngang() {
  const request = {
    type: GameRequestType.ACTION_ANGANG,
    data: {
      tileIds: tilesToAnGang.value.split(",").map((tileId) => parseInt(tileId)) as [TileId, TileId, TileId, TileId],
    },
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.actionAngang(request.data.tileIds);
    game.value = data;
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
  }
}

const tilesToGang = ref<string>("-1,-1,-1");
async function actionGang() {
  const request = {
    type: GameRequestType.ACTION_GANG,
    data: {
      tileIds: tilesToGang.value.split(",").map((tileId) => parseInt(tileId)) as [TileId, TileId, TileId],
    },
  };
  const message = appendMessage(request.type, request.data, null);
  try {
    const data = await clientApi.actionGang(request.data.tileIds);
    game.value = data;
    updateMessage(message, data, "completed");
  } catch (error: any) {
    updateMessage(message, { message: error.message }, "failed");
  }
}

function handleDrop(tileId?: TileId) {
  if (tileId) {
    tileToDrop.value = tileId;
    actionDrop();
  }
}
</script>
