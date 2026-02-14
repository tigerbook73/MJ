import { Injectable } from "@nestjs/common";
import { ClientModel, UserModel, SignInRequest } from "@mj/shared";
import { RoomService } from "./room.service";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private roomService: RoomService,
  ) {}

  signIn(data: SignInRequest["data"], client: ClientModel): UserModel {
    // check user is signed in or not
    if (client.user) {
      throw new Error("User already signed in");
    }

    if (data.email === "") {
      throw new Error("Email is empty");
    }

    // check email format is a valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Email format is invalid");
    }

    let user = this.userService.find(data.email);

    if (!user) {
      user = this.userService.create({
        name: data.email,
        firstName: data.email.split("@")[0],
        lastName: data.email.split("@")[1],
        email: data.email,
      });
    }

    client.user = user;
    return user;
  }

  signOut(client: ClientModel): void {
    if (!client.user) {
      throw new Error("User not signed in");
    }

    this.roomService.dropUser(client.user);
    client.user = null;
  }
}
