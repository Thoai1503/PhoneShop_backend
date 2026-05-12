import jwt, { type SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { TokenPair } from '../../api/dto/user.dto.js';

export default class JWTService {
  private accessTokenSecret: jwt.Secret;
  private refreshTokenSecret: jwt.Secret;
  private accessTokenExpiry: string;
  private refreshTokenExpiry: string;

  constructor() {
    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw new Error('JWT secrets are not defined in environment variables');
    }

    this.accessTokenSecret = process.env.JWT_SECRET;
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
    this.accessTokenExpiry = process.env.JWT_EXPIRE || '15m';
    this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRE || '7d';
  }

  generateAccessToken(payload: any) {
    const options: SignOptions = {
      expiresIn: this.accessTokenExpiry as any,
      issuer: 'electric-store-api',
      audience: 'electric-store-client',
    };

    return jwt.sign(payload, this.accessTokenSecret, options);
  }

  generateRefreshToken(payload: any) {
    const options: SignOptions = {
      expiresIn: this.refreshTokenExpiry as any,
      issuer: 'electric-store-api',
      audience: 'electric-store-client',
    };
    return jwt.sign(payload, this.refreshTokenSecret, options);
  }

  generateTokens(payload: any): TokenPair {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      expiresIn: this.getTokenExpiryTime(this.accessTokenExpiry),
    };
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, this.accessTokenSecret, {
      issuer: 'electric-store-api',
      audience: 'electric-store-client',
    });
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, this.refreshTokenSecret, {
      issuer: 'electric-store-api',
      audience: 'electric-store-client',
    });
  }

  decodeToken(token: string) {
    return jwt.decode(token);
  }

  getTokenExpiryTime(expiryString: string): number {
    const match = expiryString.match(/^(\d+)([smhd])$/);
    if (!match) return 900;

    const value = parseInt(match[1]!);
    const unit = match[2];

    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 3600;
      case 'd':
        return value * 86400;
      default:
        return 900;
    }
  }

  generatePasswordResetToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  generateEmailVerificationToken(payload: any) {
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: '24h',
      issuer: 'electric-store-api',
      audience: 'electric-store-client',
    });
  }

  isTokenExpired(token: string): boolean {
    const decoded: any = jwt.decode(token);
    if (!decoded || !decoded.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  getTokenPayload(token: string) {
    return jwt.decode(token);
  }
}
