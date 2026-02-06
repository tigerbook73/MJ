# User Module

This module provides comprehensive user management functionality with Prisma database integration and password support.

## Architecture

The user module follows NestJS best practices with a layered architecture:

- **DTOs (Data Transfer Objects)**: Input validation and data transformation
- **Repository**: Database operations abstraction
- **Service**: Business logic and password management
- **Controller**: HTTP endpoint handling
- **Tests**: Comprehensive unit tests

## Features

### 1. User Service
- **CRUD Operations**: Create, read, update, and delete users
- **Password Management**: SHA-256 password hashing (consider bcrypt/argon2 for production)
- **Validation**: Email uniqueness, password strength (min 8 characters)
- **Error Handling**: Proper HTTP exceptions (ConflictException, NotFoundException, BadRequestException)
- **Password Sanitization**: Passwords never exposed in responses

### 2. Database Repository (Prisma)
- Type-safe database queries using Prisma Client
- Efficient query methods (findById, findByEmail, existsByEmail, etc.)
- Transaction support through Prisma
- Automatic timestamp management (createdAt, updatedAt)

### 3. Password Support
- Password hashing on creation and update
- Password validation method for authentication
- Minimum 8-character password requirement
- Existing users migrated with default password: "ChangeMe123"

## API Endpoints

### Create User
```
POST /users
Body: { email, name?, password }
Response: UserResponseDto (without password)
```

### Get All Users
```
GET /users
Response: UserResponseDto[]
```

### Get User by ID
```
GET /users/:id
Response: UserResponseDto
```

### Get User by Email
```
GET /users/email/:email
Response: UserResponseDto
```

### Update User
```
PUT /users/:id
Body: { email?, name?, password? }
Response: UserResponseDto
```

### Delete User
```
DELETE /users/:id
Response: UserResponseDto
```

## Data Transfer Objects (DTOs)

### CreateUserDto
```typescript
{
  email: string;
  name?: string;
  password: string;
}
```

### UpdateUserDto
```typescript
{
  email?: string;
  name?: string;
  password?: string;
}
```

### UserResponseDto
```typescript
{
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  // Note: password field is never included
}
```

## Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Usage Example

```typescript
import { UserService } from './user/user.service';

// Inject the service
constructor(private readonly userService: UserService) {}

// Create a user
const user = await this.userService.create({
  email: 'john@example.com',
  name: 'John Doe',
  password: 'securePassword123'
});

// Validate password
const isValid = await this.userService.validatePassword(
  'john@example.com',
  'securePassword123'
);

// Update user
const updated = await this.userService.update(user.id, {
  name: 'John Smith'
});
```

## Testing

Run unit tests:
```bash
npm test -- user.service.spec.ts
```

The test suite covers:
- User creation with validation
- Finding users by ID and email
- Updating user information
- Deleting users
- Password validation
- Error handling scenarios

## Security Considerations

### Current Implementation
- Passwords are hashed using SHA-256
- Passwords are never returned in API responses
- Email uniqueness is enforced
- Minimum password length is 8 characters

### Production Recommendations
1. **Use bcrypt or argon2** instead of SHA-256 for password hashing
2. **Add rate limiting** to prevent brute-force attacks
3. **Implement password complexity rules** (uppercase, lowercase, numbers, special chars)
4. **Add email verification** before account activation
5. **Implement password reset** functionality
6. **Add JWT authentication** for API protection
7. **Use HTTPS** for all communications
8. **Add input validation library** (class-validator, class-transformer)
9. **Implement audit logging** for security events
10. **Add account lockout** after failed login attempts

## Migration Notes

Existing users in the database have been migrated with:
- Default password: "ChangeMe123" (hashed)
- createdAt and updatedAt set to migration time
- Users should be prompted to change their password on next login

## Dependencies

- `@nestjs/common`: NestJS core functionality
- `@prisma/client`: Database ORM
- `crypto` (Node.js built-in): Password hashing

## Future Enhancements

- [ ] Implement bcrypt/argon2 password hashing
- [ ] Add class-validator for DTO validation
- [ ] Add email verification workflow
- [ ] Implement password reset functionality
- [ ] Add user roles and permissions
- [ ] Implement soft delete
- [ ] Add pagination for user list
- [ ] Add search and filtering capabilities
- [ ] Implement user profile images
- [ ] Add OAuth/SSO support
