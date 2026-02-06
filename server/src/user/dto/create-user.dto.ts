import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "User email address",
    example: "user@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User full name",
    example: "John Doe",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "User password (minimum 8 characters)",
    example: "SecurePass123",
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
