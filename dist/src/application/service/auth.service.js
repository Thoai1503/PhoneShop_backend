var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import UserDTO from '../../api/dto/user.dto.js';
import { UsersRepository } from '../../infrastruture/repository/user.repository.js';
import PasswordService from './password.service.js';
import JWTService from './JWT.service.js';
let AuthService = class AuthService {
    userRepo;
    passwordService;
    jwtService;
    constructor(userRepo, passwordService, jwtService) {
        this.userRepo = userRepo;
        this.passwordService = passwordService;
        this.jwtService = jwtService;
    }
    refreshToken = async (req, res, next) => {
        try {
            const { refreshToken } = req;
            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token is required',
                    code: 'MISSING_REFRESH_TOKEN',
                });
            }
            const decoded = this.jwtService.verifyRefreshToken(refreshToken);
            const user = await this.userRepo.getUserById(decoded?.id);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found',
                    code: 'USER_NOT_FOUND',
                });
            }
            const newTokens = user.generateAuthToken();
            const cookieOptions = {
                expires: new Date(Date.now() +
                    (Number(process.env.JWT_COOKIE_EXPIRE) || 0) * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
            };
            res
                .status(200)
                .cookie('accessToken', newTokens.accessToken, cookieOptions)
                .cookie('refreshToken', newTokens.refreshToken, {
                ...cookieOptions,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            })
                .json({
                success: true,
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole(),
                accessToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken,
                expiresIn: newTokens.expiresIn,
            });
        }
        catch (error) {
            console.error('Token refresh error:', error);
            next(error);
        }
    };
    async validateUser(email, password, res) {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
                code: 'MISSING_CREDENTIALS',
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format',
                code: 'INVALID_EMAIL',
            });
        }
        const user = await this.userRepo.findByEmail(email);
        if (!user)
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
                code: 'INVALID_CREDENTIALS',
            });
        if (user.getStatus() !== 1)
            return res.status(401).json({
                success: false,
                message: 'Account is not active',
                code: 'ACCOUNT_INACTIVE',
            });
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid)
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
                code: 'INVALID_CREDENTIALS',
            });
        return this.sendTokenResponse(user, 200, res);
    }
    sendTokenResponse = (user, statusCode, res) => {
        const tokens = user.generateAuthToken();
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        };
        console.log('Generated tokens:', {
            accessToken: tokens.accessToken ? 'EXISTS' : 'MISSING',
            refreshToken: tokens.refreshToken ? 'EXISTS' : 'MISSING',
            expiresIn: tokens.expiresIn,
        });
        return res
            .status(statusCode)
            .cookie('accessToken', tokens.accessToken, cookieOptions)
            .cookie('refreshToken', tokens.refreshToken, {
            ...cookieOptions,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
            .json({
            success: true,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            expiresIn: tokens.expiresIn,
            user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole(),
                status: user.getStatus(),
            },
        });
    };
    register = async (req, res, next) => {
        try {
            if (!req.getName() || !req.getEmail() || !req.getPassword()) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required',
                    code: 'MISSING_FIELDS',
                });
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(req.getEmail())) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email format',
                    code: 'INVALID_EMAIL',
                });
            }
            const passwordValidation = this.passwordService.validatePassword(req.getPassword());
            if (!passwordValidation.isValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Password does not meet requirements',
                    errors: passwordValidation.errors,
                    code: 'WEAK_PASSWORD',
                });
            }
            const existingUser = await this.userRepo.findByEmail(req.getEmail());
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'User with this email already exists',
                    code: 'USER_EXISTS',
                });
            }
            const newUser = new UserDTO({
                id: 0,
                name: req.getName(),
                email: req.getEmail(),
                phone: '034354',
                password: req.getPassword(),
                role: 0,
                status: 0,
            });
            await newUser.hashPassword();
            newUser.setStatus(1);
            const createdUser = await this.userRepo.createUser(newUser);
            this.sendTokenResponse(createdUser, 201, res);
        }
        catch (error) {
            console.error('Registration error:', error);
            next(error);
        }
    };
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UsersRepository,
        PasswordService,
        JWTService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map