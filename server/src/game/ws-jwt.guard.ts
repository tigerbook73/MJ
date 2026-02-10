import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    await this.validateClient(client);
    return true;
  }

  /**
   * Validates JWT token and attaches user payload to socket.data.user
   * Can be called from guards or directly from handleConnection
   */
  async validateClient(client: Socket): Promise<void> {
    const token = this.extractTokenFromHandshake(client);

    if (!token) {
      throw new WsException("Unauthorized - No token provided");
    }

    // Backward compatibility: allow "no-token"
    if (token === "no-token") {
      client.data.user = { isGuest: true };
      return;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      // Attach user info to socket for later use
      client.data.user = payload;
    } catch {
      throw new WsException("Unauthorized - Invalid token");
    }
  }

  private extractTokenFromHandshake(client: Socket): string | undefined {
    // Token can come from:
    // 1. Handshake auth: { auth: { token: 'xxx' } }
    // 2. Auth header: authorization: Bearer xxx
    // 3. Query params: ?token=xxx

    const token =
      client.handshake.auth?.token ||
      client.handshake.headers?.authorization?.replace("Bearer ", "") ||
      (client.handshake.query?.token as string);

    return token;
  }
}
