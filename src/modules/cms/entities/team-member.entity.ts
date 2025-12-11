import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('team_members')
export class TeamMember {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 255 })
  role: string; // e.g., 'Founder', 'Admin', 'Content Manager', 'Volunteer Coordinator'

  @Column({ type: 'varchar', length: 255, nullable: true })
  category: string; // e.g., 'Leadership', 'Operations', 'Content', 'Community'

  @Column({ type: 'text', nullable: true })
  contributions: string; // Description of their contributions

  @Column({ type: 'json', nullable: true })
  social_links: Record<string, string>;

  @Column({ type: 'int', default: 0 })
  display_order: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
