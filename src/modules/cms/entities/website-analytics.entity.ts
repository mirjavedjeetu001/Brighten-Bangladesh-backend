import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('website_analytics')
export class WebsiteAnalytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', unique: true })
  date: string;

  @Column({ name: 'page_views', type: 'int', default: 0 })
  pageViews: number;

  @Column({ name: 'unique_visitors', type: 'int', default: 0 })
  uniqueVisitors: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
