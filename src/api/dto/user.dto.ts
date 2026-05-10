import bcrypt from 'bcryptjs';
import JWTService from '../../application/service/JWT.service.js';
export interface TokenPair {
  accessToken: string;
  refreshToken?: string;
  [key: string]: any;
}

export interface JwtPayload {
  id: number;
  email: string;
  role: number;
  status: number;
  [key: string]: any;
}
export interface UserData {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  role: number;
  status: number;
}

export default class UserDTO {
  private id: number = 0;
  private name: string = '';
  private email: string = '';
  private phone: string = '';
  private password: string = '';
  private role: number = 0;
  private status: number = 0;
  private jwtService: JWTService;

  static USER_TABLE = 'users';

  constructor(data?: UserData) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? '';
    this.email = data?.email ?? '';
    this.phone = data?.phone ?? '';
    this.password = data?.password ?? '';
    this.role = data?.role ?? 0;
    this.status = data?.status ?? 0;

    this.jwtService = new JWTService();
  }
  public getId(): number {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getEmail(): string {
    return this.email;
  }
  public getPhone(): string {
    return this.phone;
  }
  public getPassword(): string {
    return this.password;
  }
  public getRole(): number {
    return this.role;
  }
  public getStatus(): number {
    return this.status;
  }
  public setStatus(status: number): void {
    this.status = status;
  }

  // -- Validation helper (simple, synchronous)
  // returns { valid, errors }
  static validate(payload: {
    name?: string;
    email?: string;
    password?: string;
    role?: number;
    status?: number;
  }) {
    const errors: Record<string, string> = {};

    if (!payload.name || payload.name.trim() === '') {
      errors.name = 'Name is required';
    } else if (payload.name.length > 100) {
      errors.name = 'Name must be <= 100 chars';
    }

    if (!payload.email || payload.email.trim() === '') {
      errors.email = 'Email is required';
    } else {
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

  //   // Keep bcrypt require inside method to reduce circular dependency risk during gradual migration
  async hashPassword(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires

    const saltRounds = 10;
    this.password = await bcrypt.hash(String(this.password), saltRounds);
  }

  async comparePassword(plain: string): Promise<boolean> {
    return await bcrypt.compare(String(plain), String(this.password).trim());
  }

  generateAuthToken(): TokenPair {
    const payload: JwtPayload = {
      id: this.id,
      email: this.email,
      role: this.role,
      status: this.status,
    };
    const tokens: TokenPair = this.jwtService.generateTokens(payload);
    return tokens;
  }
}
