import jwt from 'jsonwebtoken';
import crypto from 'crypto';
export default class JWTService {
    accessTokenSecret;
    refreshTokenSecret;
    accessTokenExpiry;
    refreshTokenExpiry;
    constructor() {
        if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
            throw new Error('JWT secrets are not defined in environment variables');
        }
        this.accessTokenSecret = process.env.JWT_SECRET;
        this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
        this.accessTokenExpiry = process.env.JWT_EXPIRE || '30m';
        this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRE || '7d';
    }
    generateAccessToken(payload) {
        const options = {
            expiresIn: this.accessTokenExpiry,
            issuer: 'electric-store-api',
            audience: 'electric-store-client',
        };
        return jwt.sign(payload, this.accessTokenSecret, options);
    }
    generateRefreshToken(payload) {
        const options = {
            expiresIn: this.refreshTokenExpiry,
            issuer: 'electric-store-api',
            audience: 'electric-store-client',
        };
        return jwt.sign(payload, this.refreshTokenSecret, options);
    }
    generateTokens(payload) {
        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);
        return {
            accessToken,
            refreshToken,
            expiresIn: this.getTokenExpiryTime(this.accessTokenExpiry),
        };
    }
    verifyAccessToken(token) {
        return jwt.verify(token, this.accessTokenSecret, {
            issuer: 'electric-store-api',
            audience: 'electric-store-client',
        });
    }
    verifyRefreshToken(token) {
        return jwt.verify(token, this.refreshTokenSecret, {
            issuer: 'electric-store-api',
            audience: 'electric-store-client',
        });
    }
    decodeToken(token) {
        return jwt.decode(token);
    }
    getTokenExpiryTime(expiryString) {
        const match = expiryString.match(/^(\d+)([smhd])$/);
        if (!match)
            return 900;
        const value = parseInt(match[1]);
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
    generateEmailVerificationToken(payload) {
        return jwt.sign(payload, this.accessTokenSecret, {
            expiresIn: '24h',
            issuer: 'electric-store-api',
            audience: 'electric-store-client',
        });
    }
    isTokenExpired(token) {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp)
            return true;
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    }
    getTokenPayload(token) {
        return jwt.decode(token);
    }
}
//# sourceMappingURL=JWT.service.js.map