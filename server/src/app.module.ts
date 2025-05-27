import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MjGameModule } from "./game/mj-game.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.modeule";

@Module({
  imports: [
    //
    ConfigModule.forRoot(),
    PrismaModule,
    ScheduleModule.forRoot(),
    MjGameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
