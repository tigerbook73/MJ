import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { UserService } from "../user/user.service";
import { LoginDto, RegisterDto, AuthResponseDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.userService.findAuthByEmail(
      registerDto.email,
    );
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    // Create user
    const user = await this.userService.create({
      email: registerDto.email,
      name: registerDto.name,
      password: registerDto.password,
    });

    return {
      userId: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Find user by email
    const user = await this.userService.findAuthByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await argon2.verify(
      user.password,
      loginDto.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return {
      userId: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async loginOrRegister(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Try to find user by email
    const user = await this.userService.findAuthByEmail(loginDto.email);
    if (user) {
      return this.login(loginDto);
    }
    return this.register({
      email: loginDto.email,
      name: loginDto.email.split("@")[0], // Use email prefix as name
      password: loginDto.password,
    });
  }

  async validateUser(payload: { sub: number; email: string }) {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return user;
  }

  generateToken(userId: number, email: string): string {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwtService.sign(payload, {
      expiresIn: "7d",
    });
  }

  generateWsToken(userId: number): string {
    const payload = {
      sub: userId,
      type: "ws",
    };

    return this.jwtService.sign(payload, {
      expiresIn: "10m",
    });
  }
}
