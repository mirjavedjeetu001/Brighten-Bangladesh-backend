import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Event } from './event.entity';

export enum RegistrationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Entity('event_registrations')
@Index(['event_id', 'user_id'], { unique: true })
export class EventRegistration {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  event_id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'enum', enum: RegistrationStatus, default: RegistrationStatus.PENDING })
  status: RegistrationStatus;

  @CreateDateColumn()
  registered_at: Date;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
