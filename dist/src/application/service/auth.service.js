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
import jwt from 'jsonwebtoken';
import PasswordService from './password.service.js';
import JWTService from './JWT.service.js';
import { MailService } from '../../service/mail.service.js';
let AuthService = class AuthService {
    userRepo;
    passwordService;
    jwtService;
    mailService;
    constructor(userRepo, passwordService, jwtService, mailService) {
        this.userRepo = userRepo;
        this.passwordService = passwordService;
        this.jwtService = jwtService;
        this.mailService = mailService;
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
    verifyEmailToken = async (token, res) => {
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Verification token is required',
                code: 'MISSING_VERIFY_TOKEN',
            });
        }
        try {
            const decoded = this.jwtService.verifyAccessToken(token);
            if (!decoded?.id || !decoded?.email) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid verification token payload',
                    code: 'INVALID_VERIFY_TOKEN',
                });
            }
            if (decoded.purpose !== 'email_verification') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid token purpose',
                    code: 'INVALID_TOKEN_PURPOSE',
                });
            }
            const user = await this.userRepo.getUserById(decoded.id);
            if (!user || user.getEmail() !== decoded.email) {
                return res.status(404).json({
                    success: false,
                    message: 'User for verification token not found',
                    code: 'VERIFY_USER_NOT_FOUND',
                });
            }
            if (user.getStatus() === 1) {
                return res.status(200).json({
                    success: true,
                    message: 'Email already verified',
                    code: 'EMAIL_ALREADY_VERIFIED',
                });
            }
            await this.userRepo.markUserAsVerified(user.getId());
            return res.status(200).json({
                success: true,
                message: 'Email verified successfully. You can now log in.',
                code: 'EMAIL_VERIFIED',
            });
        }
        catch (error) {
            if (error instanceof jwt.TokenExpiredError ||
                error instanceof jwt.JsonWebTokenError) {
                return res.status(400).json({
                    success: false,
                    message: 'Verification token is invalid or expired',
                    code: 'INVALID_OR_EXPIRED_VERIFY_TOKEN',
                });
            }
            console.error('Email verification error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while verifying email',
                code: 'VERIFY_EMAIL_ERROR',
            });
        }
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
                is_verified: 0,
            });
            await newUser.hashPassword();
            newUser.setStatus(0);
            newUser.setIsVerified(0);
            const createdUser = await this.userRepo.createUser(newUser);
            const verifyToken = this.jwtService.generateEmailVerificationToken({
                id: createdUser.getId(),
                email: createdUser.getEmail(),
                purpose: 'email_verification',
            });
            const frontendBaseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            const verifyUrl = `${frontendBaseUrl}/verify-email?token=${encodeURIComponent(verifyToken)}`;
            try {
                console.log('Sending registration email to:', createdUser.getEmail());
                await this.mailService.sendMail({
                    to: createdUser.getEmail(),
                    subject: 'Xac nhan email dang ky tai khoan PhoneShop',
                    text: `Xin chao ${createdUser.getName()},\n\nVui long xac nhan email dang ky tai khoan bang link sau:\n${verifyUrl}\n\nLink co hieu luc trong 24 gio.`,
                    html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
              <h3>Xin chao ${createdUser.getName()},</h3>
              <p>Cam on ban da dang ky tai khoan tai PhoneShop.</p>
              <p>Vui long bam nut ben duoi de xac nhan email:</p>
              <p>
                <a href="${verifyUrl}" style="display:inline-block;background:#0d6efd;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;">Xac nhan email</a>
              </p>
              <p>Neu nut khong hoat dong, ban co the sao chep link sau:</p>
              <p><a href="${verifyUrl}">${verifyUrl}</a></p>
              <p>Link co hieu luc trong 24 gio.</p>
            </div>`,
                });
                console.log('Registration email sent successfully');
            }
            catch (mailErr) {
                console.error('Gửi mail thất bại:', mailErr);
            }
            return res.status(201).json({
                success: true,
                message: 'Dang ky thanh cong. Vui long kiem tra email de xac nhan tai khoan.',
                code: 'REGISTER_SUCCESS_VERIFY_EMAIL_REQUIRED',
                data: {
                    id: createdUser.getId(),
                    email: createdUser.getEmail(),
                    status: createdUser.getStatus(),
                },
            });
        }
        catch (error) {
            console.error('Registration error:', error);
            next(error);
        }
    };
    logout = async (res) => {
        try {
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 0,
            };
            return res
                .status(200)
                .clearCookie('accessToken', { path: '/' })
                .clearCookie('refreshToken', { path: '/' })
                .json({
                success: true,
                message: 'Logout successful',
                code: 'LOGOUT_SUCCESS',
            });
        }
        catch (error) {
            console.error('Logout error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error during logout',
                code: 'LOGOUT_ERROR',
            });
        }
    };
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UsersRepository,
        PasswordService,
        JWTService,
        MailService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map