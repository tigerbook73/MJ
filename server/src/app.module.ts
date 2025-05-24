import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MjGameModule } from "./game/mj-game.module";
import { ScheduleModule } from "@nestjs/schedule";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "client", "dist", "spa"), // Path to your built SPA's dist/build directory
      serveRoot: "/", // Serve static files from the root URL
      renderPath: "*", // Fallback for all unmatched paths to index.html
    }),
    MjGameModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
