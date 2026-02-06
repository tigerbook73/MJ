import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserSchema, UpdateUserSchema } from "./dto";
import type { CreateUserDto, UpdateUserDto } from "./dto";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new ZodValidationPipe(CreateUserSchema))
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get("email/:email")
  findByEmail(@Param("email") email: string) {
    return this.userService.findByEmail(email);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Put(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(UpdateUserSchema))
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
