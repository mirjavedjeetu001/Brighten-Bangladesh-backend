import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserCv } from '../../user-cvs/entities/user-cv.entity';

@Entity('cv_templates')
export class CvTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'thumbnail_url', nullable: true, length: 500 })
  thumbnailUrl: string;

  @Column({ name: 'html_content', type: 'longtext' })
  htmlContent: string;

  @Column({ name: 'css_content', type: 'longtext', nullable: true })
  cssContent: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => UserCv, (userCv) => userCv.template)
  userCvs: UserCv[];
}
