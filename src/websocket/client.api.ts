import {
  GameRequestType,
  ListRoomRequest,
  ListRoomResponse,
  SignInRequest,
  SignInResponse,
} from "src/common/protocols/apis.models";
import { socketSendAndWait } from "./socket";

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
