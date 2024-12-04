import { reactive } from "vue";
import { io } from "socket.io-client";
import { GameResponse } from "src/common/protocols/apis.models";

export const socketState = reactive({
  connected: false,
});

// "undefined" means the URL will be computed from the `window.location` object
export const socket = io(undefined);

socket.on("connect", () => {
  socketState.connected = true;
  console.log("Connected to the server");
});

socket.on("disconnect", () => {
  socketState.connected = false;
  console.log("Disconnected from the server");
});

export function socketSend(data: unknown) {
  socket.emit("mj:game", data);
}

export function socketSendAndWaitAck(data: unknown): Promise<GameResponse> {
  return new Promise((resolve) => {
    socket.once("mj:game", (response: GameResponse) => {
      resolve(response);
    });
    socket.emit("mj:game", data);
  });
}

export function onSocketReceive(callback: (data: GameResponse) => void) {
  socket.on("mj:game", callback);
  return callback;
}

export function offSocketReceive(callback: (data: GameResponse) => void) {
  socket.off("mj:game", callback);
}
