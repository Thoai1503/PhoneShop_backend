import bcrypt from 'bcryptjs';
import JWTService from '../../application/service/JWT.service.js';
export default class UserDTO {
    id = 0;
    name = '';
    email = '';
    phone = '';
    password = '';
    role = 0;
    status = 0;
    is_verified = 0;
    jwtService;
    static USER_TABLE = 'users';
    constructor(data) {
        this.id = data?.id ?? 0;
        this.name = data?.name ?? '';
        this.email = data?.email ?? '';
        this.phone = data?.phone ?? '';
        this.password = data?.password ?? '';
        this.role = data?.role ?? 0;
        this.status = data?.status ?? 0;
        this.is_verified = data?.is_verified ?? 0;
        this.jwtService = new JWTService();
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPhone() {
        return this.phone;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getIsVerified() {
        return this.is_verified;
    }
    setIsVerified(is_verified) {
        this.is_verified = is_verified;
    }
    static validate(payload) {
        const errors = {};
        if (!payload.name || payload.name.trim() === '') {
            errors.name = 'Name is required';
        }
        else if (payload.name.length > 100) {
            errors.name = 'Name must be <= 100 chars';
        }
        if (!payload.email || payload.email.trim() === '') {
            errors.email = 'Email is required';
        }
        else {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(payload.email.toLowerCase())) {
                errors.email = 'Email is invalid';
            }
        }
        if (payload.password !== undefined) {
            if (payload.password.length < 6) {
                errors.password = 'Password must be at least 6 characters';
            }
        }
        if (payload.role !== undefined && typeof payload.role !== 'number') {
            errors.role = 'Role must be a number';
        }
        if (payload.status !== undefined && typeof payload.status !== 'number') {
            errors.status = 'Status must be a number';
        }
        return {
            valid: Object.keys(errors).length === 0,
            errors,
        };
    }
    async hashPassword() {
        const saltRounds = 10;
        this.password = await bcrypt.hash(String(this.password), saltRounds);
    }
    async comparePassword(plain) {
        return await bcrypt.compare(String(plain), String(this.password).trim());
    }
    generateAuthToken() {
        const payload = {
            id: this.id,
            email: this.email,
            role: this.role,
            status: this.status,
        };
        const tokens = this.jwtService.generateTokens(payload);
        return tokens;
    }
}
//# sourceMappingURL=user.dto.js.map