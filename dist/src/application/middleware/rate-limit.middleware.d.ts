import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterService } from '../../common/service/rate-limiter.service.js';
import JWTService from '../service/JWT.service.js';
export declare class RateLimitMiddleware implements NestMiddleware {
    private readonly rateLimiter;
    private readonly jwtService;
    constructor(rateLimiter: RateLimiterService, jwtService: JWTService);
    use(req: Request, res: Response, next: NextFunction): void;
    private getResetTime;
}
