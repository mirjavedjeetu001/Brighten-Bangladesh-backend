import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('magazines')
export class Magazine {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'issue_number' })
  issueNumber: string;

  @Column({ type: 'date', nullable: true, name: 'publish_date' })
  publishDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'cover_image' })
  coverImage: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'file_path' })
  filePath: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
