var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import JWTService from '../application/service/JWT.service.js';
let AuthGuard = class AuthGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const token = this.extractTokenFromHeader(request);
        const originUrl = request.originalUrl;
        try {
            if (!token) {
                return false;
            }
            const isValid = this.jwtService.verifyAccessToken(token);
            if (isValid) {
                request.userId = isValid.id;
            }
            if (isValid.role === 1 &&
                method !== 'GET' &&
                !originUrl.includes('/api/v1/auth/refresh_token') &&
                !originUrl.includes('api/cart') &&
                !originUrl.includes('api/v1/useraddress')) {
                request.admin = isValid;
            }
            else {
                request.admin = null;
            }
            return isValid;
        }
        catch (error) {
            throw new UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = (request.headers.get?.('authorization') ||
            request.headers['authorization'])?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
AuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [JWTService])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map