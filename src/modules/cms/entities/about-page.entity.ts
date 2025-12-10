import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('about_page')
export class AboutPage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  hero_title: string;

  @Column({ type: 'text', nullable: true })
  hero_subtitle: string;

  @Column({ type: 'text', nullable: true })
  hero_image: string;

  @Column({ type: 'text', nullable: true })
  mission_title: string;

  @Column({ type: 'text', nullable: true })
  mission_content: string;

  @Column({ type: 'text', nullable: true })
  vision_title: string;

  @Column({ type: 'text', nullable: true })
  vision_content: string;

  @Column({ type: 'text', nullable: true })
  values_title: string;

  @Column({ type: 'text', nullable: true })
  values_content: string;

  @Column({ type: 'text', nullable: true })
  story_title: string;

  @Column({ type: 'text', nullable: true })
  story_content: string;

  @Column({ type: 'text', nullable: true })
  team_title: string;

  @Column({ type: 'text', nullable: true })
  team_subtitle: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
