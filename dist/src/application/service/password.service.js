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
import bcrypt from 'bcryptjs';
let PasswordService = class PasswordService {
    saltRounds;
    minLength;
    requireUppercase;
    requireLowercase;
    requireNumbers;
    requireSpecialChars;
    constructor() {
        this.saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
        this.minLength = parseInt(process.env.MIN_PASSWORD_LENGTH) || 8;
        this.requireUppercase = process.env.PASSWORD_REQUIRE_UPPERCASE === 'true';
        this.requireLowercase = process.env.PASSWORD_REQUIRE_LOWERCASE === 'true';
        this.requireNumbers = process.env.PASSWORD_REQUIRE_NUMBERS === 'true';
        this.requireSpecialChars =
            process.env.PASSWORD_REQUIRE_SPECIAL_CHARS === 'true';
    }
    async hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            return await bcrypt.hash(password, salt);
        }
        catch (error) {
            throw new Error('Error hashing password');
        }
    }
    async comparePassword(password, hash) {
        try {
            return await bcrypt.compare(password, hash);
        }
        catch (error) {
            throw new Error('Error comparing password');
        }
    }
    validatePassword(password) {
        const errors = [];
        if (!password || password.length < this.minLength) {
            errors.push(`Password must be at least ${this.minLength} characters long`);
        }
        if (this.requireUppercase && !/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (this.requireLowercase && !/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (this.requireNumbers && !/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        if (this.requireSpecialChars &&
            !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }
        const commonPasswords = [
            'password',
            '123456',
            '123456789',
            'qwerty',
            'abc123',
            'password123',
            'admin',
            'letmein',
            'welcome',
            'monkey',
        ];
        if (commonPasswords.includes(password.toLowerCase())) {
            errors.push('Password is too common, please choose a stronger password');
        }
        if (/(.)\1{2,}/.test(password)) {
            errors.push('Password cannot contain more than 2 consecutive identical characters');
        }
        const keyboardPatterns = ['qwerty', 'asdfgh', 'zxcvbn', '123456', '654321'];
        for (const pattern of keyboardPatterns) {
            if (password.toLowerCase().includes(pattern)) {
                errors.push('Password contains common keyboard patterns');
                break;
            }
        }
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
    generateSecurePassword(length = 16) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let password = '';
        if (this.requireUppercase) {
            password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
        }
        if (this.requireLowercase) {
            password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
        }
        if (this.requireNumbers) {
            password += '0123456789'[Math.floor(Math.random() * 10)];
        }
        if (this.requireSpecialChars) {
            password += '!@#$%^&*()_+-=[]{}|;:,.<>?'[Math.floor(Math.random() * 32)];
        }
        while (password.length < length) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }
        return password
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('');
    }
    getPasswordStrength(password) {
        let score = 0;
        if (password.length >= 8)
            score += 25;
        if (password.length >= 12)
            score += 10;
        if (password.length >= 16)
            score += 10;
        if (/[a-z]/.test(password))
            score += 10;
        if (/[A-Z]/.test(password))
            score += 10;
        if (/\d/.test(password))
            score += 10;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
            score += 15;
        if (/(.)\1{2,}/.test(password))
            score -= 10;
        if (/123|abc|qwe/i.test(password))
            score -= 10;
        return Math.max(0, Math.min(100, score));
    }
    getPasswordStrengthDescription(score) {
        if (score < 30)
            return { level: 'Weak', color: 'red' };
        if (score < 60)
            return { level: 'Fair', color: 'orange' };
        if (score < 80)
            return { level: 'Good', color: 'yellow' };
        return { level: 'Strong', color: 'green' };
    }
};
PasswordService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], PasswordService);
export default PasswordService;
//# sourceMappingURL=password.service.js.map