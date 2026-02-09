import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { RoomService } from "./game/room.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly roomService: RoomService,
  ) {}

  @Get()
  getRoot(): string {
    return this.appService.getHello();
  }

  @Get("/hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/test")
  getTest(): string {
    return "test";
  }

  // test
  @Get("/rooms")
  getRooms() {
    return this.roomService.findAll();
  }
}
