import {
  Body,
  Controller,
  Get,
  Next,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDTO } from '../dto/login.dto.js';
import { AuthService } from '../../application/service/auth.service.js';
import type { NextFunction, Response } from 'express';
import { RegisterDTO } from '../dto/register.dto.js';
import UserDTO from '../dto/user.dto.js';
import { AuthGuard } from '../../auth/auth.guard.js';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    console.log('Login attempt:', body);

    const user = await this.authService.validateUser(
      body.email,
      body.password,
      res,
    );
    if (!user) {
      return res;
    }
    console.log('User validated:', user);
    // res.cookie('access_token', 'abc123', {
    //   httpOnly: true,
    //   secure: false, // true khi dùng HTTPS
    //   maxAge: 1000 * 60 * 60, // 1 giờ
    // });
    return res;
  }

  @Post('register')
  async register(
    @Body() body: RegisterDTO,
    @Res({ passthrough: true }) res: Response,
    @Next() next: NextFunction,
  ) {
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

  @Post('refresh_token')
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Body() body: { refreshToken?: string },
  ) {
    return this.authService.refreshToken(
      { refreshToken: body.refreshToken },
      res,
      () => {},
    );
  }

  @Post('verify-email')
  async verifyEmailByPost(
    @Res({ passthrough: true }) res: Response,
    @Body() body: { token?: string },
  ) {
    return this.authService.verifyEmailToken(body.token, res);
  }

  @Get('verify-email')
  async verifyEmailByGet(
    @Res({ passthrough: true }) res: Response,
    @Query('token') token?: string,
  ) {
    return this.authService.verifyEmailToken(token, res);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<Response> {
    return this.authService.logout(res);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any): Promise<any> {
    return 'This is a protected route. Your user ID is: ' + req.userId;
  }
}
