import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let controller: AuthController;
  let service: AuthService;

  const mockResponse = {
    cookie: jest.fn(),
    clearCookie: jest.fn(),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            logout: jest.fn().mockResolvedValue(undefined),
            generateToken: jest.fn().mockReturnValue("mock-token"),
            generateWsToken: jest.fn().mockReturnValue("mock-ws-token"),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe("register", () => {
    it("should register a new user and set cookie", async () => {
      const registerDto = {
        email: "test@example.com",
        name: "Test User",
        password: "password123",
      };

      const mockResult = {
        userId: 1,
        email: "test@example.com",
        name: "Test User",
      };

      jest.spyOn(service, "register").mockResolvedValue(mockResult);

      const result = await controller.register(registerDto, mockResponse);

      expect(result).toEqual(mockResult);
      expect(service.register).toHaveBeenCalledWith(registerDto);
      expect(service.generateToken).toHaveBeenCalledWith(1, "test@example.com");
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        "auth_token",
        "mock-token",
        expect.objectContaining({ httpOnly: true }),
      );
    });
  });

  describe("login", () => {
    it("should login a user and set cookie", async () => {
      const loginDto = {
        email: "test@example.com",
        password: "password123",
      };

      const mockResult = {
        userId: 1,
        email: "test@example.com",
        name: "Test User",
      };

      jest.spyOn(service, "login").mockResolvedValue(mockResult);

      const result = await controller.login(loginDto, mockResponse);

      expect(result).toEqual(mockResult);
      expect(service.login).toHaveBeenCalledWith(loginDto);
      expect(service.generateToken).toHaveBeenCalledWith(1, "test@example.com");
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        "auth_token",
        "mock-token",
        expect.objectContaining({ httpOnly: true }),
      );
    });
  });

  describe("getMe", () => {
    it("should return logged-in user profile", () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = controller.getMe(mockUser);

      expect(result).toEqual(mockUser);
      expect(result.id).toBe(1);
      expect(result.email).toBe("test@example.com");
    });
  });

  describe("getWsToken", () => {
    it("should return a WS token", () => {
      const result = controller.getWsToken(1);

      expect(result).toEqual({ token: "mock-ws-token" });
      expect(service.generateWsToken).toHaveBeenCalledWith(1);
    });
  });

  describe("logout", () => {
    it("should clear the auth cookie", async () => {
      const result = await controller.logout(1, mockResponse);

      expect(service.logout).toHaveBeenCalledWith(1);
      expect(mockResponse.clearCookie).toHaveBeenCalledWith("auth_token", {
        path: "/",
      });
      expect(result).toEqual({ message: "Logged out successfully" });
    });
  });
});
