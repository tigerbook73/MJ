import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @MinLength(8)
  password: string;
}
