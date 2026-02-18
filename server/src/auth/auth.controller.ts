import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCookieAuth,
} from "@nestjs/swagger";
import { Response } from "express";
import { AuthService } from "./auth.service";
import {
  LoginDto,
  RegisterDto,
  AuthResponseDto,
  WsTokenResponseDto,
} from "./dto";
import { JwtAuthGuard } from "../libs/guards/jwt.guard";
import { User } from "../libs/decorators/user.decorator";
import { UserResponseDto } from "../user/dto";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: "User registered successfully",
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({ status: 409, description: "User already exists" })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(registerDto);
    const token = this.authService.generateToken(result.userId, result.email);
    res.cookie("auth_token", token, COOKIE_OPTIONS);
    return result;
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login user" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: "Login successful",
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);
    const token = this.authService.generateToken(result.userId, result.email);
    res.cookie("auth_token", token, COOKIE_OPTIONS);
    return result;
  }

  @Post("login-or-register")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login or register user" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: "Login or registration successful",
    type: AuthResponseDto,
  })
  async loginOrRegister(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.loginOrRegister(loginDto);
    const token = this.authService.generateToken(result.userId, result.email);
    res.cookie("auth_token", token, COOKIE_OPTIONS);
    return result;
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth()
  @ApiOperation({ summary: "Get current user profile" })
  @ApiResponse({
    status: 200,
    description: "User profile retrieved successfully",
    type: UserResponseDto,
  })
  getMe(@User() user: UserResponseDto): UserResponseDto {
    return user;
  }

  @Get("ws-token")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth()
  @ApiOperation({ summary: "Get a short-lived WebSocket authentication token" })
  @ApiResponse({
    status: 200,
    description: "WebSocket token generated successfully",
    type: WsTokenResponseDto,
  })
  getWsToken(@User("id") userId: number): WsTokenResponseDto {
    const token = this.authService.generateWsToken(userId);
    return { token };
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth()
  @ApiOperation({ summary: "Logout user" })
  @ApiResponse({
    status: 200,
    description: "Logged out successfully",
  })
  async logout(
    @User("id") userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(userId);
    res.clearCookie("auth_token", { path: "/" });
    return { message: "Logged out successfully" };
  }
}
