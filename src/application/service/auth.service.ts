import { Injectable } from '@nestjs/common';
import UserDTO from '../../api/dto/user.dto.js';
import { UsersRepository } from '../../infrastruture/repository/user.repository.js';
import { CookieOptions, NextFunction, Response } from 'express';
import PasswordService from './password.service.js';
import JWTService from './JWT.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JWTService,
  ) {}

  refreshToken = async (
    req: {
      refreshToken?: string;
    },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { refreshToken } = req;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token is required',
          code: 'MISSING_REFRESH_TOKEN',
        });
      }

      const decoded = this.jwtService.verifyRefreshToken(refreshToken) as any;

      // Get user from database
      const user = await this.userRepo.getUserById(decoded?.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        });
      }

      // Generate new tokens
      const newTokens = user.generateAuthToken();

      const cookieOptions: CookieOptions = {
        expires: new Date(
          Date.now() +
            (Number(process.env.JWT_COOKIE_EXPIRE) || 0) * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only secure in production
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
    } catch (error) {
      console.error('Token refresh error:', error);
      next(error);
    }
  };

  async validateUser(
    email: string,
    password: string,
    res: Response,
  ): Promise<UserDTO | Response> {
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

  sendTokenResponse = (user: UserDTO, statusCode: number, res: Response) => {
    const tokens = user.generateAuthToken();

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only secure in production
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    };

    // Debug logging
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
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
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
  register = async (req: UserDTO, res: Response, next: NextFunction) => {
    //  const { name, email, password, repeated_password } = req;

    try {
      // Input validation
      if (!req.getName() || !req.getEmail() || !req.getPassword()) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
          code: 'MISSING_FIELDS',
        });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.getEmail())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format',
          code: 'INVALID_EMAIL',
        });
      }

      // Phone format validation
      // const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      // if (!phoneRegex.test(phone)) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Invalid phone number format",
      //     code: "INVALID_PHONE",
      //   });
      // }

      // Password validation
      const passwordValidation = this.passwordService.validatePassword(
        req.getPassword(),
      );
      if (!passwordValidation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Password does not meet requirements',
          errors: passwordValidation.errors,
          code: 'WEAK_PASSWORD',
        });
      }

      // Check if user already exists
      const existingUser = await this.userRepo.findByEmail(req.getEmail());
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists',
          code: 'USER_EXISTS',
        });
      }

      // Create new user
      const newUser = new UserDTO({
        id: 0,
        name: req.getName(),
        email: req.getEmail(),
        phone: '034354',
        password: req.getPassword(),
        role: 0,
        status: 0,
      });
      await newUser.hashPassword(); // Hash password before saving
      newUser.setStatus(1); // Set default status to active

      const createdUser = await this.userRepo.createUser(newUser);
      this.sendTokenResponse(createdUser, 201, res);
    } catch (error) {
      console.error('Registration error:', error);
      next(error);
    }
  };
}
