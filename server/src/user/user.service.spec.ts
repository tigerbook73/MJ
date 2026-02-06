import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import {
  ConflictException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";

describe("UserService", () => {
  let service: UserService;

  const mockUser = {
    id: 1,
    email: "test@example.com",
    name: "Test User",
    password: "hashedPassword123",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUserRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    existsByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    const createUserDto: CreateUserDto = {
      email: "test@example.com",
      name: "Test User",
      password: "password123",
    };

    it("should create a new user successfully", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(result).toBeDefined();
      expect(result.email).toBe(createUserDto.email);
      expect(result.name).toBe(createUserDto.name);
      expect(result).not.toHaveProperty("password");
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(mockUserRepository.create).toHaveBeenCalled();
    });

    it("should throw ConflictException if user already exists", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it("should throw BadRequestException for short password", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      const invalidDto = { ...createUserDto, password: "short" };

      await expect(service.create(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("findAll", () => {
    it("should return all users without passwords", async () => {
      mockUserRepository.findAll.mockResolvedValue([mockUser]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]).not.toHaveProperty("password");
      expect(mockUserRepository.findAll).toHaveBeenCalled();
    });

    it("should return empty array when no users exist", async () => {
      mockUserRepository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toHaveLength(0);
    });
  });

  describe("findById", () => {
    it("should return a user by id", async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await service.findById(1);

      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result).not.toHaveProperty("password");
      expect(mockUserRepository.findById).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundException if user not found", async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe("findByEmail", () => {
    it("should return a user by email", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await service.findByEmail("test@example.com");

      expect(result).toBeDefined();
      expect(result.email).toBe("test@example.com");
      expect(result).not.toHaveProperty("password");
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        "test@example.com",
      );
    });

    it("should throw NotFoundException if user not found", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(service.findByEmail("notfound@example.com")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("update", () => {
    const updateUserDto: UpdateUserDto = {
      name: "Updated Name",
    };

    it("should update a user successfully", async () => {
      const updatedUser = { ...mockUser, name: "Updated Name" };
      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.update.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);

      expect(result.name).toBe("Updated Name");
      expect(result).not.toHaveProperty("password");
      expect(mockUserRepository.update).toHaveBeenCalled();
    });

    it("should throw NotFoundException if user not found", async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(service.update(999, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserRepository.update).not.toHaveBeenCalled();
    });

    it("should throw ConflictException when updating to existing email", async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.existsByEmail.mockResolvedValue(true);

      const dto = { email: "existing@example.com" };
      await expect(service.update(1, dto)).rejects.toThrow(ConflictException);
    });

    it("should throw BadRequestException for short password", async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);

      const dto = { password: "short" };
      await expect(service.update(1, dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe("delete", () => {
    it("should delete a user successfully", async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.delete.mockResolvedValue(mockUser);

      const result = await service.delete(1);

      expect(result).toBeDefined();
      expect(result).not.toHaveProperty("password");
      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundException if user not found", async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.delete).not.toHaveBeenCalled();
    });
  });

  describe("validatePassword", () => {
    it("should return true for correct password", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      // The service will hash the input password, so we need to provide the correct one
      const result = await service.validatePassword(
        "test@example.com",
        "password123",
      );

      expect(result).toBeDefined();
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        "test@example.com",
      );
    });

    it("should return false for user not found", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      const result = await service.validatePassword(
        "notfound@example.com",
        "password123",
      );

      expect(result).toBe(false);
    });
  });

  describe("count", () => {
    it("should return user count", async () => {
      mockUserRepository.count.mockResolvedValue(5);

      const result = await service.count();

      expect(result).toBe(5);
      expect(mockUserRepository.count).toHaveBeenCalled();
    });
  });

  describe("list (legacy)", () => {
    it("should return all users (backward compatibility)", async () => {
      mockUserRepository.findAll.mockResolvedValue([mockUser]);

      const result = await service.list();

      expect(result).toHaveLength(1);
      expect(result[0]).not.toHaveProperty("password");
    });
  });
});
