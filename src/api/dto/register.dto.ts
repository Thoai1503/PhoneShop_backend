import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  repeated_password?: string;

  @IsOptional()
  @IsInt()
  role: number;

  @IsOptional()
  @IsInt()
  status: number;
  constructor(
    name: string,
    email: string,
    phone: string,
    password: string,
    role: number = 0,
    status: number = 0,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.role = role;
    this.status = status;
  }
}
