import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { JobCategory } from './job-category.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  company: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'job_type' })
  jobType: string; // full-time, part-time, contract, internship

  @Column({ type: 'bigint', unsigned: true, nullable: true, name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => JobCategory, category => category.jobs, { nullable: true, eager: true })
  @JoinColumn({ name: 'category_id' })
  category: JobCategory;

  @Column({ type: 'varchar', length: 500, name: 'apply_link' })
  applyLink: string;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
