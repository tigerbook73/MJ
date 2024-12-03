import { reactive } from "vue";
import { io } from "socket.io-client";
import { GameResponse } from "src/common/protocols/apis.models";

export const socketState = reactive({
  connected: false,
});

// "undefined" means the URL will be computed from the `window.location` object
export const socket = process.env.NODE_ENV === "production" ? io(undefined) : io("http://192.168.3.71:3000");

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

export function onSocketReceive(callback: (data: GameResponse) => void) {
  socket.on("mj:game", callback);
}
