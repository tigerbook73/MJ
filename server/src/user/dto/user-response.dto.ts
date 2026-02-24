import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({ description: "User ID", example: 1 })
  id: number;

  @ApiProperty({
    description: "User email address",
    example: "user@example.com",
  })
  email: string;

  @ApiProperty({
    description: "User full name",
    example: "John Doe",
  })
  name: string;

  @ApiProperty({
    description: "User creation timestamp",
    example: "2024-01-15T10:30:00Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "User last update timestamp",
    example: "2024-01-15T10:30:00Z",
  })
  updatedAt: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
