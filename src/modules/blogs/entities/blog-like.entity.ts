import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, Unique } from 'typeorm';
import { Blog } from './blog.entity';
import { User } from '../../users/entities/user.entity';

@Entity('blog_likes')
@Unique(['blog_id', 'user_id'])
export class BlogLike {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ManyToOne(() => Blog, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @Column('bigint')
  blog_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('bigint')
  user_id: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}