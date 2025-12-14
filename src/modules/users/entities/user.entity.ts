import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Blog } from '../../blogs/entities/blog.entity';
import { Membership } from '../../memberships/entities/membership.entity';
import { UserActivity } from '../../memberships/entities/user-activity.entity';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  CONTENT_MANAGER = 'content_manager',
  EDITOR = 'editor',
  MEMBER = 'member',
  VOLUNTEER = 'volunteer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 191 })
  name: string;

  @Column({ type: 'varchar', length: 191, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  @Exclude()
  passwordHash: string;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'mobile_number' })
  mobileNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  division: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nid: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'education_status' })
  educationStatus: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  organization: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  designation: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'highest_education' })
  highestEducation: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'education_major' })
  educationMajor: string;

  @Column({ type: 'text', nullable: true, name: 'area_of_interest' })
  areaOfInterest: string;

  @Column({ type: 'text', nullable: true, name: 'reason_to_join' })
  reasonToJoin: string;

  @Column({ type: 'longtext', nullable: true, name: 'profile_photo' })
  profilePhoto: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @Column({ type: 'boolean', default: false, name: 'is_approved' })
  isApproved: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_email_verified' })
  isEmailVerified: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'otp_code' })
  otpCode: string | null;

  @Column({ type: 'datetime', nullable: true, name: 'otp_expires_at' })
  otpExpiresAt: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'reset_otp_code' })
  resetOtpCode: string | null;

  @Column({ type: 'datetime', nullable: true, name: 'reset_otp_expires_at' })
  resetOtpExpiresAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];

  @OneToMany(() => UserActivity, (activity) => activity.user)
  activities: UserActivity[];
}
