import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum MembershipStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  EXPIRED = 'expired',
}

@Entity('memberships')
export class Membership {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true, name: 'membership_id' })
  membershipId: string;

  @Column({
    type: 'enum',
    enum: MembershipStatus,
    default: MembershipStatus.INACTIVE,
  })
  status: MembershipStatus;

  @Column({ type: 'date', nullable: true, name: 'valid_from' })
  validFrom: Date;

  @Column({ type: 'date', nullable: true, name: 'valid_to' })
  validTo: Date;

  @Column({ type: 'json', nullable: true })
  criteria: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
