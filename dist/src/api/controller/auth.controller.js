var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Next, Post, Query, Request, Res, UseGuards, } from '@nestjs/common';
import { LoginDTO } from '../dto/login.dto.js';
import { AuthService } from '../../application/service/auth.service.js';
import { RegisterDTO } from '../dto/register.dto.js';
import UserDTO from '../dto/user.dto.js';
import { AuthGuard } from '../../auth/auth.guard.js';
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(body, res) {
        console.log('Login attempt:', body);
        const user = await this.authService.validateUser(body.email, body.password, res);
        if (!user) {
            return res;
        }
        console.log('User validated:', user);
        return res;
    }
    async register(body, res, next) {
        const newUser = new UserDTO({
            id: 0,
            name: body.name,
            email: body.email,
            phone: body.phone ?? '034354',
            password: body.password,
            role: body.role ?? 0,
            status: body.status ?? 0,
            is_verified: 0,
        });
        return this.authService.register(newUser, res, next);
    }
    async refreshToken(res, body) {
        return this.authService.refreshToken({ refreshToken: body.refreshToken }, res, () => { });
    }
    async verifyEmailByPost(res, body) {
        return this.authService.verifyEmailToken(body.token, res);
    }
    async verifyEmailByGet(res, token) {
        return this.authService.verifyEmailToken(token, res);
    }
    async logout(res) {
        return this.authService.logout(res);
    }
    async getProfile(req) {
        return 'This is a protected route. Your user ID is: ' + req.userId;
    }
};
__decorate([
    Post('login'),
    __param(0, Body()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Post('register'),
    __param(0, Body()),
    __param(1, Res({ passthrough: true })),
    __param(2, Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterDTO, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    Post('refresh_token'),
    __param(0, Res({ passthrough: true })),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    Post('verify-email'),
    __param(0, Res({ passthrough: true })),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmailByPost", null);
__decorate([
    Get('verify-email'),
    __param(0, Res({ passthrough: true })),
    __param(1, Query('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmailByGet", null);
__decorate([
    Post('logout'),
    __param(0, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    UseGuards(AuthGuard),
    Get('profile'),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
AuthController = __decorate([
    Controller('api/v1/auth'),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map