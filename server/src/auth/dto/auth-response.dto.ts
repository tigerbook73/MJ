import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto {
  @ApiProperty({
    description: "JWT access token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  accessToken: string;

  @ApiProperty({
    description: "Token expiration time in seconds",
    example: 3600,
  })
  expiresIn: number;

  @ApiProperty({
    description: "User ID",
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: "User email",
    example: "user@example.com",
  })
  email: string;
}
