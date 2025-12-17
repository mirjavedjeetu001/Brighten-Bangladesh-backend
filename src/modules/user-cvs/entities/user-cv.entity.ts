import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CvTemplate } from '../../cv-templates/entities/cv-template.entity';

@Entity('user_cvs')
export class UserCv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'template_id' })
  templateId: number;

  @Column({ default: 'My CV' })
  title: string;

  @Column({ name: 'personal_info', type: 'json', nullable: true })
  personalInfo: {
    name?: string;
    title?: string;
    email?: string;
    phone?: string;
    location?: string;
    photo?: string;
    summary?: string;
  };

  @Column({ type: 'json', nullable: true })
  experience: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    location?: string;
    description?: string;
  }>;

  @Column({ type: 'json', nullable: true })
  education: Array<{
    degree: string;
    institution: string;
    graduationDate: string;
    location?: string;
    description?: string;
  }>;

  @Column({ type: 'json', nullable: true })
  skills: string[];

  @Column({ type: 'json', nullable: true })
  languages: Array<{
    language: string;
    proficiency: string;
  }>;

  @Column({ name: 'additional_sections', type: 'json', nullable: true })
  additionalSections: {
    certifications?: Array<{ name: string; issuer: string; date: string }>;
    projects?: Array<{ name: string; description: string; date?: string }>;
    awards?: Array<{ name: string; issuer: string; date: string }>;
    activities?: Array<{ role?: string; organization?: string; period?: string }>;
    references?: Array<{ name?: string; title?: string; organization?: string; contact?: string }>;
    portfolio?: string[];
    personalSkills?: string[];
    themeColor?: string;
    sectionTitles?: Record<string, string>;
  };

  @Column({ name: 'html_content', type: 'longtext', nullable: true })
  htmlContent: string;

  @Column({ name: 'is_public', type: 'boolean', default: false })
  isPublic: boolean;

  @Column({ name: 'download_count', type: 'int', default: 0 })
  downloadCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => CvTemplate, (template) => template.userCvs)
  @JoinColumn({ name: 'template_id' })
  template: CvTemplate;
}
