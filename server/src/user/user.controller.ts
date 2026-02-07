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
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "./dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@ApiTags("User")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: "Unauthorized - missing or invalid token",
})
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: "User created successfully",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({ status: 409, description: "User already exists" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "List of all users",
    type: [UserResponseDto],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get("email/:email")
  @ApiOperation({ summary: "Get user by email" })
  @ApiParam({
    name: "email",
    description: "User email address",
    example: "user@example.com",
  })
  @ApiResponse({
    status: 200,
    description: "User found",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found" })
  findByEmail(@Param("email") email: string) {
    return this.userService.findByEmail(email);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  @ApiParam({ name: "id", description: "User ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "User found",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update user" })
  @ApiParam({ name: "id", description: "User ID", example: 1 })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: "User updated successfully",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete user" })
  @ApiParam({ name: "id", description: "User ID", example: 1 })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  remove(@Param("id", ParseIntPipe) id: number) {
    this.userService.delete(id);
    return;
  }
}
