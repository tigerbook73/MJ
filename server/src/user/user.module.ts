import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { MjGameModule } from "src/game/mj-game.module";

@Module({
  imports: [MjGameModule],
  controllers: [UserController],
})
export class UserModule {}
