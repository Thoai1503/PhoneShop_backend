import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterService } from '../../common/service/rate-limiter.service.js';
import JWTService from '../service/JWT.service.js';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(
    private readonly rateLimiter: RateLimiterService,
    private readonly jwtService: JWTService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Ưu tiên dùng userId nếu đã login, fallback về IP

    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const decoded = this.jwtService.verifyAccessToken(token);
      if (decoded && decoded.id) {
        (req as any).user = { userId: decoded.id };
      }
    }

    const userId = (req as any).user?.userId;
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';
    const key = userId ? `user:${userId}` : `ip:${ip}`;

    const allowed = this.rateLimiter.isAllowed(key, 100, 60 * 1000); // 100 requests / 60 giây
    console.log(
      `Rate limit check for ${key}: ${allowed ? 'allowed' : 'blocked'}`,
    );
    if (!allowed) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
          retryAfter: 60,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Thêm header thông tin
    res.setHeader('X-RateLimit-Limit', '100');
    res.setHeader('X-RateLimit-Remaining', 'TODO'); // có thể cải tiến sau
    res.setHeader(
      'X-RateLimit-Reset',
      Math.ceil(this.getResetTime(key) / 1000),
    );

    next();
  }

  private getResetTime(key: string): number {
    const record = this.rateLimiter['store'].get(key);
    return record ? record.resetTime : Date.now() + 60000;
  }
}
