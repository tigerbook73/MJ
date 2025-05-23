import { reactive } from "vue";
import { io } from "socket.io-client";
import type { GameRequest, GameResponse } from "@common/protocols/apis.models";

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

export function socketSendAndWait(data: GameRequest): Promise<GameResponse> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () =>
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        reject({
          type: data.type,
          status: "error",
          message: "timeout",
          data: null,
        }),
      1000,
    );
    socket.emit(
      "mj:game",
      data,
      (response: GameResponse) => {
        resolve(response);
        clearTimeout(timeout);
      },
      //
    );
  });
}

type SocketReceiveCallback = (data: GameResponse) => void;

export function onSocketReceive(callback: SocketReceiveCallback) {
  socket.on("mj:game", callback);
  return callback;
}

export function offSocketReceive(callback: SocketReceiveCallback) {
  socket.off("mj:game", callback);
}
