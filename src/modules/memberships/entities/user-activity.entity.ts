import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ActivityType {
  BLOG_PUBLISHED = 'blog_published',
  EVENT_PARTICIPATION = 'event_participation',
  PROJECT_PARTICIPATION = 'project_participation',
}

@Entity('user_activities')
export class UserActivity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'user_id', nullable: true })
  userId: number;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @Column({ type: 'json', nullable: true })
  meta: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.activities, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
