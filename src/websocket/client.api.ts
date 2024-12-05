import {
  GameRequestType,
  JoinRoomResponse,
  ListRoomRequest,
  ListRoomResponse,
  SignInRequest,
  SignInResponse,
  JoinRoomRequest,
} from "src/common/protocols/apis.models";
import { socketSendAndWait } from "./socket";
import { PlayerPosition } from "src/common/models/common.types";

export function socketSignInAndWaitAck(email: string, password: string): Promise<SignInResponse> {
  const request: SignInRequest = {
    type: GameRequestType.SIGN_IN,
    data: {
      email,
      password,
    },
  };
  return socketSendAndWait(request) as Promise<SignInResponse>;
}

export function socketListRoomAndWaitAck(): Promise<ListRoomResponse> {
  const request: ListRoomRequest = {
    type: GameRequestType.LIST_ROOM,
  };
  return socketSendAndWait(request) as Promise<ListRoomResponse>;
}

export function socketJoinRoomAndWaitAck(roomName: string, position: PlayerPosition): Promise<JoinRoomResponse> {
  const request: JoinRoomRequest = {
    type: GameRequestType.JOIN_ROOM,
    data: {
      roomName,
      position,
    },
  };
  return socketSendAndWait(request) as Promise<JoinRoomResponse>;
}
