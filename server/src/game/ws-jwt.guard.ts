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
   * Validates WS JWT token and attaches user payload to socket.data.user
   * Only accepts tokens with type: 'ws' (rejects HTTP tokens)
   */
  async validateClient(client: Socket): Promise<void> {
    const token = client.handshake.auth?.token;

    if (!token) {
      throw new WsException("Unauthorized - No token provided");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      if (payload.type !== "ws") {
        throw new WsException("Unauthorized - Invalid token type");
      }

      client.data.user = { sub: payload.sub, type: payload.type };
    } catch (error) {
      if (error instanceof WsException) {
        throw error;
      }
      throw new WsException("Unauthorized - Invalid token");
    }
  }
}
