import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Blog } from './blog.entity';
import { User } from '../../users/entities/user.entity';

@Entity('blog_comments')
export class BlogComment {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  author_name: string;

  @Column({ nullable: true })
  author_email: string;

  @ManyToOne(() => Blog, (blog) => blog.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @Column('bigint')
  blog_id: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bigint', nullable: true })
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
