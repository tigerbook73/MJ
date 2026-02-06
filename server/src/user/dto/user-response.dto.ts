export class UserResponseDto {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
