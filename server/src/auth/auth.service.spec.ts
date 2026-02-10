import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
import * as argon2 from "argon2";

jest.mock("argon2");

describe("AuthService", () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findById: jest.fn(),
            findByEmail: jest.fn(),
            findAuthByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue("mock-token"),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const registerDto = {
        email: "test@example.com",
        name: "Test User",
        password: "password123",
      };

      const mockUser = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        password: "hashed-password",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, "findAuthByEmail").mockResolvedValue(null);
      jest.spyOn(argon2, "hash").mockResolvedValue("hashed-password");
      jest.spyOn(userService, "create").mockResolvedValue(mockUser);

      const result = await service.register(registerDto);

      expect(result.accessToken).toBe("mock-token");
      expect(result.userId).toBe(1);
      expect(result.email).toBe("test@example.com");
    });

    it("should throw ConflictException if user already exists", async () => {
      const registerDto = {
        email: "existing@example.com",
        name: "Test User",
        password: "password123",
      };

      const existingUser = {
        id: 1,
        email: "existing@example.com",
        name: "Test User",
        password: "hashed-password",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(userService, "findAuthByEmail")
        .mockResolvedValue(existingUser);

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe("login", () => {
    it("should login a valid user", async () => {
      const loginDto = {
        email: "test@example.com",
        password: "password123",
      };

      const mockUser = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        password: "hashed-password",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, "findAuthByEmail").mockResolvedValue(mockUser);
      jest.spyOn(argon2, "verify").mockResolvedValue(true);

      const result = await service.login(loginDto);

      expect(result.accessToken).toBe("mock-token");
      expect(result.userId).toBe(1);
    });

    it("should throw UnauthorizedException for invalid email", async () => {
      const loginDto = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      jest.spyOn(userService, "findAuthByEmail").mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it("should throw UnauthorizedException for invalid password", async () => {
      const loginDto = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      const mockUser = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        password: "hashed-password",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, "findAuthByEmail").mockResolvedValue(mockUser);
      jest.spyOn(argon2, "verify").mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
