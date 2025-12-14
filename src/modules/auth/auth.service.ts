import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/entities/user.entity';
import { RegisterDto, LoginDto, VerifyOtpDto, ResetPasswordDto } from './dto/auth.dto';
import { MailService } from '../../common/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
    private dataSource: DataSource,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const saltRounds = this.configService.get<number>('bcrypt.saltRounds');
    const passwordHash = await bcrypt.hash(registerDto.password, saltRounds);
    const otpCode = this.generateOtp();
    const otpHash = await bcrypt.hash(otpCode, saltRounds);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = queryRunner.manager.create(User, {
        ...registerDto,
        passwordHash,
        isApproved: false, // New users require approval
        isEmailVerified: false,
        otpCode: otpHash,
        otpExpiresAt,
        role: UserRole.MEMBER, // Default role
      });

      await queryRunner.manager.save(user);
      await this.mailService.sendOtpEmail(user.email, otpCode);

      await queryRunner.commitTransaction();

      const { passwordHash: _, otpCode: __, otpExpiresAt: ___, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        requiresEmailVerification: true,
        message: 'Registration successful. We sent a verification code to your email. Please verify your email. After verification, your application will be reviewed by admin (usually within 8 hours).',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email with the OTP we sent to proceed.');
    }

    // Check if user is approved
    if (!user.isApproved) {
      throw new UnauthorizedException('Your account is pending approval. Please wait for admin approval.');
    }

    const token = this.generateToken(user);

    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(userId: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const user = await this.usersRepository.findOne({ where: { email: verifyOtpDto.email } });

    if (!user) {
      throw new BadRequestException('Invalid email or OTP.');
    }

    if (user.isEmailVerified) {
      return {
        message: 'Email already verified. You can sign in after admin approval.',
      };
    }

    if (!user.otpCode || !user.otpExpiresAt) {
      throw new BadRequestException('No OTP found. Please request a new code.');
    }

    if (user.otpExpiresAt.getTime() < Date.now()) {
      throw new BadRequestException('OTP expired. Please request a new code.');
    }

    const isMatch = await bcrypt.compare(verifyOtpDto.otp, user.otpCode);
    if (!isMatch) {
      throw new BadRequestException('Invalid OTP.');
    }

    user.isEmailVerified = true;
    user.otpCode = null;
    user.otpExpiresAt = null;
    await this.usersRepository.save(user);

    return {
      message: 'Email verified. Your application is under review and will be approved by an admin.',
    };
  }

  async resendOtp(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isEmailVerified) {
      return { message: 'Email already verified.' };
    }

    const saltRounds = this.configService.get<number>('bcrypt.saltRounds');
    const otpCode = this.generateOtp();
    user.otpCode = await bcrypt.hash(otpCode, saltRounds);
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.usersRepository.save(user);
    await this.mailService.sendOtpEmail(user.email, otpCode);

    return { message: 'A new verification code has been sent to your email.' };
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async forgotPassword(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    // For security, return success even if user not found
    if (!user) {
      return { message: 'If the account exists, a reset code has been sent to the email.' };
    }

    const saltRounds = this.configService.get<number>('bcrypt.saltRounds');
    const otpCode = this.generateOtp();
    user.resetOtpCode = await bcrypt.hash(otpCode, saltRounds);
    user.resetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.usersRepository.save(user);
    await this.mailService.sendPasswordResetEmail(user.email, otpCode);

    return { message: 'If the account exists, a reset code has been sent to the email.' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.usersRepository.findOne({ where: { email: dto.email } });

    if (!user) {
      throw new BadRequestException('Invalid email or code.');
    }

    if (!user.resetOtpCode || !user.resetOtpExpiresAt) {
      throw new BadRequestException('No reset request found. Please request a new code.');
    }

    if (user.resetOtpExpiresAt.getTime() < Date.now()) {
      throw new BadRequestException('Reset code expired. Please request a new code.');
    }

    const isMatch = await bcrypt.compare(dto.otp, user.resetOtpCode);
    if (!isMatch) {
      throw new BadRequestException('Invalid reset code.');
    }

    const saltRounds = this.configService.get<number>('bcrypt.saltRounds');
    user.passwordHash = await bcrypt.hash(dto.newPassword, saltRounds);
    // Treat successful reset as proof of email control to avoid blocking login on old verification state
    user.isEmailVerified = true;
    user.otpCode = null;
    user.otpExpiresAt = null;
    user.resetOtpCode = null;
    user.resetOtpExpiresAt = null;

    await this.usersRepository.save(user);

    return { message: 'Password has been reset. You can now sign in.' };
  }
}
