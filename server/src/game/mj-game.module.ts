import { Module } from "@nestjs/common";
import { MjGameGateway } from "./mj-game.gateway";
import { GameService } from "./game.service";
import { ClientService } from "./client.service";
import { RoomService } from "./room.service";
import { WsJwtGuard } from "./ws-jwt.guard";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [AuthModule, UserModule],
  providers: [
    MjGameGateway,
    GameService,
    ClientService,
    RoomService,
    WsJwtGuard,
  ],
  exports: [RoomService, GameService, ClientService],
})
export class MjGameModule {}
