import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'longtext', nullable: true })
  content: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_title: string;

  @Column({ type: 'text', nullable: true })
  meta_description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_keywords: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  featured_image: string;

  @Column({ type: 'varchar', length: 50, default: 'default' })
  template: string;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @Column({ type: 'timestamp', nullable: true })
  published_at: Date;

  @Column({ type: 'bigint', nullable: true })
  created_by: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
