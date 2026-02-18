import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
import * as argon2 from "argon2";
import { ClientService } from "../game/client.service";
import { RoomService } from "../game/room.service";

jest.mock("argon2");

describe("AuthService", () => {
  let service: AuthService;
  let userService: UserService;
  let clientService: ClientService;
  let roomService: RoomService;

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
        {
          provide: ClientService,
          useValue: {
            findByUser: jest.fn(),
          },
        },
        {
          provide: RoomService,
          useValue: {
            dropUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    clientService = module.get<ClientService>(ClientService);
    roomService = module.get<RoomService>(RoomService);
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

      expect(result.userId).toBe(1);
      expect(result.email).toBe("test@example.com");
      expect(result.name).toBe("Test User");
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

      expect(result.userId).toBe(1);
      expect(result.email).toBe("test@example.com");
      expect(result.name).toBe("Test User");
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

  describe("generateToken", () => {
    it("should generate an HTTP JWT token", () => {
      const token = service.generateToken(1, "test@example.com");
      expect(token).toBe("mock-token");
    });
  });

  describe("generateWsToken", () => {
    it("should generate a WS JWT token", () => {
      const token = service.generateWsToken(1);
      expect(token).toBe("mock-token");
    });
  });

  describe("logout", () => {
    it("should drop the user from their room if in-game", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        name: "TestUser",
        password: "hashed",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockGameUser = { name: "TestUser" } as any;

      jest.spyOn(userService, "findById").mockResolvedValue(mockUser);
      jest
        .spyOn(clientService, "findByUser")
        .mockReturnValue({ user: mockGameUser } as any);
      jest.spyOn(roomService, "dropUser").mockImplementation(() => {});

      await service.logout(1);

      expect(userService.findById).toHaveBeenCalledWith(1);
      expect(clientService.findByUser).toHaveBeenCalledWith("TestUser");
      expect(roomService.dropUser).toHaveBeenCalledWith(mockGameUser);
    });

    it("should do nothing if user not found", async () => {
      jest.spyOn(userService, "findById").mockResolvedValue(null as any);

      await service.logout(99);

      expect(clientService.findByUser).not.toHaveBeenCalled();
    });
  });
});
