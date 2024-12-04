import {
  GameRequestType,
  ListRoomRequest,
  ListRoomResponse,
  SignInRequest,
  SignInResponse,
} from "src/common/protocols/apis.models";
import { socketSendAndWaitAck } from "./socket";

export function socketSignInAndWaitAck(email: string, password: string): Promise<SignInResponse> {
  const request: SignInRequest = {
    type: GameRequestType.SIGN_IN,
    data: {
      email,
      password,
    },
  };
  return socketSendAndWaitAck(request) as Promise<SignInResponse>;
}

export function socketListRoomAndWaitAck(email: string, password: string): Promise<ListRoomResponse> {
  const request: ListRoomRequest = {
    type: GameRequestType.LIST_ROOM,
    data: {
      email,
      password,
    },
  };
  return socketSendAndWaitAck(request) as Promise<ListRoomResponse>;
}
