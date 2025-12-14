import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mobileNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  division: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  educationStatus: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  highestEducation: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  educationMajor: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  areaOfInterest: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  organization?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reasonToJoin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  profilePhoto?: string;
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class VerifyOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  otp: string;
}

export class ResendOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  otp: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;
}
