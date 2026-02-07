import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

/**
 * Extracts user from request
 * Can be used to get entire user object or specific property
 *
 * @example
 * // Get entire user object
 * @User() user: UserResponseDto
 *
 * @example
 * // Get specific user property (e.g., email)
 * @User('email') email: string
 *
 * @example
 * // Get user ID
 * @User('id') userId: number
 */
export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = (request as any).user;

    if (!user) {
      return null;
    }

    // If data is provided, return specific property of user
    if (data) {
      return user[data];
    }

    // Return entire user object
    return user;
  },
);
