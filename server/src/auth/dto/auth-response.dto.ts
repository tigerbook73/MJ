import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto {
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

  @ApiProperty({
    description: "User name",
    example: "John Doe",
    nullable: true,
  })
  name: string | null;
}

export class WsTokenResponseDto {
  @ApiProperty({
    description: "Short-lived WebSocket authentication token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  token: string;
}
