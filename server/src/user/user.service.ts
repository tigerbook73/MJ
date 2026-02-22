import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
  BadRequestException,
} from "@nestjs/common";
import { hash, verify } from "argon2";
import { UserRepository } from "./user.repository";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "./dto";
import { User } from "src/generated/prisma/client";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Hash password using argon2
   */
  private async hashPassword(password: string): Promise<string> {
    return await hash(password, {
      type: 2, // argon2id
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });
  }

  /**
   * Remove password from user object before returning
   */
  private sanitizeUser(user: any): UserResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;
    return new UserResponseDto(userWithoutPassword);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    this.logger.log(`Creating user with email: ${createUserDto.email}`);

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    // Validate password
    if (!createUserDto.password || createUserDto.password.length < 8) {
      throw new BadRequestException(
        "Password must be at least 8 characters long",
      );
    }

    // Hash password
    const hashedPassword = await this.hashPassword(createUserDto.password);

    // Create user
    const user = await this.userRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
    });

    this.logger.log(`User created successfully with ID: ${user.id}`);
    return this.sanitizeUser(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    this.logger.log("Fetching all users");
    const users = await this.userRepository.findAll();
    return users.map((user) => this.sanitizeUser(user));
  }

  async findById(id: number): Promise<UserResponseDto> {
    this.logger.log(`Fetching user with ID: ${id}`);
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.sanitizeUser(user);
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    this.logger.log(`Fetching user with email: ${email}`);
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return this.sanitizeUser(user);
  }

  async findAuthByEmail(email: string): Promise<User | null> {
    this.logger.log(`Fetching user for auth with email: ${email}`);
    const user = await this.userRepository.findByEmail(email);

    return user; // Return full user object for authentication purposes
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    this.logger.log(`Updating user with ID: ${id}`);

    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // If email is being updated, check for conflicts
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.userRepository.existsByEmail(
        updateUserDto.email,
      );
      if (emailExists) {
        throw new ConflictException(
          `User with email ${updateUserDto.email} already exists`,
        );
      }
    }

    // Prepare update data
    const updateData: any = {};
    if (updateUserDto.email) {
      updateData.email = updateUserDto.email;
    }
    if (updateUserDto.name !== undefined) {
      updateData.name = updateUserDto.name;
    }

    // Hash password if provided
    if (updateUserDto.password) {
      if (updateUserDto.password.length < 8) {
        throw new BadRequestException(
          "Password must be at least 8 characters long",
        );
      }
      updateData.password = await this.hashPassword(updateUserDto.password);
    }

    const updatedUser = await this.userRepository.update(id, updateData);
    this.logger.log(`User with ID ${id} updated successfully`);

    return this.sanitizeUser(updatedUser);
  }

  async delete(id: number): Promise<UserResponseDto> {
    this.logger.log(`Deleting user with ID: ${id}`);

    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const deletedUser = await this.userRepository.delete(id);
    this.logger.log(`User with ID ${id} deleted successfully`);

    return this.sanitizeUser(deletedUser);
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return false;
    }

    try {
      return await verify(user.password, password);
    } catch {
      return false;
    }
  }

  async count(): Promise<number> {
    return this.userRepository.count();
  }

  // Legacy method for backward compatibility with existing code
  async list(): Promise<UserResponseDto[]> {
    return this.findAll();
  }
}
