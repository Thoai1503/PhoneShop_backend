var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { RateLimiterService } from '../../common/service/rate-limiter.service.js';
import JWTService from '../service/JWT.service.js';
let RateLimitMiddleware = class RateLimitMiddleware {
    rateLimiter;
    jwtService;
    constructor(rateLimiter, jwtService) {
        this.rateLimiter = rateLimiter;
        this.jwtService = jwtService;
    }
    use(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.slice(7);
            const decoded = this.jwtService.verifyAccessToken(token);
            if (decoded && decoded.id) {
                req.user = { userId: decoded.id };
            }
        }
        const userId = req.user?.userId;
        const ip = req.ip || req.socket?.remoteAddress || 'unknown';
        const key = userId ? `user:${userId}` : `ip:${ip}`;
        const allowed = this.rateLimiter.isAllowed(key, 100, 60 * 1000);
        console.log(`Rate limit check for ${key}: ${allowed ? 'allowed' : 'blocked'}`);
        if (!allowed) {
            throw new HttpException({
                statusCode: HttpStatus.TOO_MANY_REQUESTS,
                message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
                retryAfter: 60,
            }, HttpStatus.TOO_MANY_REQUESTS);
        }
        res.setHeader('X-RateLimit-Limit', '100');
        res.setHeader('X-RateLimit-Remaining', 'TODO');
        res.setHeader('X-RateLimit-Reset', Math.ceil(this.getResetTime(key) / 1000));
        next();
    }
    getResetTime(key) {
        const record = this.rateLimiter['store'].get(key);
        return record ? record.resetTime : Date.now() + 60000;
    }
};
RateLimitMiddleware = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RateLimiterService,
        JWTService])
], RateLimitMiddleware);
export { RateLimitMiddleware };
//# sourceMappingURL=rate-limit.middleware.js.map