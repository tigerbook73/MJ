import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MjGameGateway } from "./mj-game.gateway";
import { GameService } from "./game.service";
import { AuthService } from "./auth.service";
import { ClientService } from "./client.service";
import { UserService } from "./user.service";
import { RoomService } from "./room.service";
import { WsJwtGuard } from "./ws-jwt.guard";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "your-secret-key",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [
    MjGameGateway,
    GameService,
    AuthService,
    ClientService,
    UserService,
    RoomService,
    WsJwtGuard,
  ],
  exports: [UserService, RoomService, GameService, AuthService, ClientService],
})
export class MjGameModule {}
