import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('settings')
export class Setting {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 191, unique: true })
  setting_key: string;

  @Column({ type: 'longtext', nullable: true })
  setting_value: string;

  @Column({ type: 'varchar', length: 50, default: 'text' })
  setting_type: string;

  @Column({ type: 'varchar', length: 100, default: 'general' })
  category: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
