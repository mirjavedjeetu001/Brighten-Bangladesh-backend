import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum EventStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  short_description: string;

  @Column({ type: 'text', nullable: true })
  full_description: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ type: 'datetime' })
  event_date: Date;

  @Column({ type: 'datetime', nullable: true })
  registration_start: Date;

  @Column({ type: 'datetime', nullable: true })
  registration_deadline: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  organizer: string;

  @Column({ type: 'int', nullable: true })
  max_participants: number;

  @Column({ nullable: true })
  registration_link: string;

  @Column({ type: 'boolean', default: false })
  is_featured: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'enum', enum: EventStatus, default: EventStatus.UPCOMING })
  status: EventStatus;

  @Column({ type: 'int', default: 0 })
  display_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
