import { Socket, io } from "socket.io-client";

export class MjClient {
  public socket: Socket;
  public connected: boolean = false;

  //
  constructor() {
    //
    this.socket = io();
    this.socket.on("connect", this.onConnected);
    this.socket.on("disconnect", this.onDisconnected);
  }

  onConnected() {
    //
    this.connected = true;
  }

  onDisconnected() {
    //
    this.connected = false;
  }
}
