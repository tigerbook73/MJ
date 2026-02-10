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

    // Generate JWT
    return this.generateToken(user.id, user.email);
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

    // Generate JWT
    return this.generateToken(user.id, user.email);
  }

  async validateUser(payload: { sub: number; email: string }) {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return user;
  }

  private generateToken(userId: number, email: string): AuthResponseDto {
    const payload = {
      sub: userId,
      email,
    };

    const expiresIn = 3600; // 1 hour
    const accessToken = this.jwtService.sign(payload, {
      expiresIn,
    });

    return {
      accessToken,
      expiresIn,
      userId,
      email,
    };
  }
}
