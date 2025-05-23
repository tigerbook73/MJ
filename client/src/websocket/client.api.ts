import type {
  CreateRoomRequest,
  CreateRoomResponse,
  DeleteRoomRequest,
  DeleteRoomResponse,
  // JoinRoomRequest,
  // JoinRoomResponse,
  LeaveRoomRequest,
  LeaveRoomResponse,
  ListClientRequest,
  ListClientResponse,
  ListRoomRequest,
  ListRoomResponse,
  SignInRequest,
  SignInResponse,
  SignOutRequest,
  SignOutResponse,
} from "../../../server/src/common/protocols/apis.models";
import { GameRequestType } from "../../../server/src/common/protocols/apis.models";
import { socketSendAndWait } from "./socket";

export function sendSignIn(email: string, password: string): Promise<SignInResponse> {
  const request: SignInRequest = {
    type: GameRequestType.SIGN_IN,
    data: {
      email,
      password,
    },
  };
  return socketSendAndWait(request) as Promise<SignInResponse>;
}

export function sendSignout(): Promise<SignOutResponse> {
  //
  const request: SignOutRequest = {
    type: GameRequestType.SIGN_OUT,
  };
  return socketSendAndWait(request) as Promise<SignOutResponse>;
}

export function sendListRoom(): Promise<ListRoomResponse> {
  const request: ListRoomRequest = {
    type: GameRequestType.LIST_ROOM,
  };
  return socketSendAndWait(request) as Promise<ListRoomResponse>;
}

export function sendListClient(): Promise<ListClientResponse> {
  const request: ListClientRequest = {
    type: GameRequestType.LIST_CLIENT,
  };
  return socketSendAndWait(request) as Promise<ListClientResponse>;
}

// export function sendJoinRoom(roomName: string, position: PlayerPosition): Promise<JoinRoomResponse> {
//   const request: JoinRoomRequest = {
//     type: GameRequestType.JOIN_ROOM,
//     data: {
//       roomName,
//       position,
//     },
//   };
//   return socketSendAndWait(request) as Promise<JoinRoomResponse>;
// }

export function sendLeaveRoom(roomName: string): Promise<LeaveRoomResponse> {
  const request: LeaveRoomRequest = {
    type: GameRequestType.LEAVE_ROOM,
    data: { roomName },
  };
  return socketSendAndWait(request) as Promise<LeaveRoomResponse>;
}

export function sendCreateRoom(name: string): Promise<CreateRoomResponse> {
  const request: CreateRoomRequest = {
    type: GameRequestType.CREATE_ROOM,
    data: { name },
  };
  return socketSendAndWait(request) as Promise<CreateRoomResponse>;
}

export function sendDeleteRoom(name: string): Promise<DeleteRoomResponse> {
  const request: DeleteRoomRequest = {
    type: GameRequestType.DELETE_ROOM,
    data: { name },
  };
  return socketSendAndWait(request) as Promise<DeleteRoomResponse>;
}
