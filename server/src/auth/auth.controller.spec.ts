import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const registerDto = {
        email: "test@example.com",
        name: "Test User",
        password: "password123",
      };

      const mockResponse = {
        accessToken: "mock-token",
        expiresIn: 3600,
        userId: 1,
        email: "test@example.com",
      };

      jest.spyOn(service, "register").mockResolvedValue(mockResponse);

      const result = await controller.register(registerDto);

      expect(result).toEqual(mockResponse);
      expect(service.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe("login", () => {
    it("should login a user", async () => {
      const loginDto = {
        email: "test@example.com",
        password: "password123",
      };

      const mockResponse = {
        accessToken: "mock-token",
        expiresIn: 3600,
        userId: 1,
        email: "test@example.com",
      };

      jest.spyOn(service, "login").mockResolvedValue(mockResponse);

      const result = await controller.login(loginDto);

      expect(result).toEqual(mockResponse);
      expect(service.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe("getProfile", () => {
    it("should return logged-in user profile using @User() decorator", () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = controller.getProfile(mockUser);

      expect(result).toEqual(mockUser);
      expect(result.id).toBe(1);
      expect(result.email).toBe("test@example.com");
    });
  });
});
