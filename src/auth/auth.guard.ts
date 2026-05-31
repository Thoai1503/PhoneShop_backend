import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import JWTService from '../application/service/JWT.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JWTService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const token = this.extractTokenFromHeader(request);
    const originUrl = request.originalUrl as string;
    try {
      if (!token) {
        return false;
      }
      const isValid = this.jwtService.verifyAccessToken(token);
      if (isValid) {
        request.userId = isValid.id;
      }
      if (
        isValid.role === 1 &&
        method !== 'GET' &&
        !originUrl.includes('/api/v1/auth/refresh_token') &&
        !originUrl.includes('api/cart') &&
        !originUrl.includes('api/v1/useraddress')
      ) {
        request.admin = isValid;
      }
      else {
        request.admin = null;
      }

      return isValid;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      (
        request.headers.get?.('authorization') ||
        request.headers['authorization']
      )?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
