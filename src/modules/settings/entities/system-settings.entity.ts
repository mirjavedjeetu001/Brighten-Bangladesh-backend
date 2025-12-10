import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('system_settings')
export class SystemSettings {
  @PrimaryGeneratedColumn()
  id: number;

  // Site Information
  @Column({ name: 'site_name', type: 'varchar', length: 255, default: 'Brighten Bangladesh' })
  siteName: string;

  @Column({ name: 'site_tagline', type: 'varchar', length: 500, nullable: true })
  siteTagline: string;

  @Column({ name: 'site_logo', type: 'text', nullable: true })
  siteLogo: string;

  @Column({ name: 'site_favicon', type: 'text', nullable: true })
  siteFavicon: string;

  @Column({ name: 'primary_color', type: 'varchar', length: 7, default: '#0d9488' })
  primaryColor: string;

  @Column({ name: 'secondary_color', type: 'varchar', length: 7, default: '#f97316' })
  secondaryColor: string;

  // Contact Information
  @Column({ name: 'contact_email', type: 'varchar', length: 255, nullable: true })
  contactEmail: string;

  @Column({ name: 'contact_phone', type: 'varchar', length: 50, nullable: true })
  contactPhone: string;

  @Column({ name: 'contact_address', type: 'text', nullable: true })
  contactAddress: string;

  // Social Media Links
  @Column({ name: 'facebook_url', type: 'varchar', length: 500, nullable: true })
  facebookUrl: string;

  @Column({ name: 'twitter_url', type: 'varchar', length: 500, nullable: true })
  twitterUrl: string;

  @Column({ name: 'linkedin_url', type: 'varchar', length: 500, nullable: true })
  linkedinUrl: string;

  @Column({ name: 'instagram_url', type: 'varchar', length: 500, nullable: true })
  instagramUrl: string;

  @Column({ name: 'youtube_url', type: 'varchar', length: 500, nullable: true })
  youtubeUrl: string;

  // SEO Settings
  @Column({ name: 'meta_description', type: 'text', nullable: true })
  metaDescription: string;

  @Column({ name: 'meta_keywords', type: 'text', nullable: true })
  metaKeywords: string;

  // Blog Posting Limits
  @Column({ name: 'member_blog_limit', type: 'int', default: 1 })
  memberBlogLimit: number;

  @Column({ name: 'blog_limit_period_days', type: 'int', default: 7 })
  blogLimitPeriodDays: number;

  @Column({ name: 'volunteer_blog_limit', type: 'int', default: 2 })
  volunteerBlogLimit: number;

  @Column({ name: 'editor_blog_limit', type: 'int', default: 5 })
  editorBlogLimit: number;

  // Membership Eligibility Requirements
  @Column({ name: 'min_blogs_for_membership', type: 'int', default: 4 })
  minBlogsForMembership: number;

  @Column({ name: 'min_events_for_membership', type: 'int', default: 1 })
  minEventsForMembership: number;

  @Column({ name: 'min_projects_for_membership', type: 'int', default: 1 })
  minProjectsForMembership: number;

  // Footer Content
  @Column({ name: 'footer_text', type: 'text', nullable: true })
  footerText: string;

  @Column({ name: 'copyright_text', type: 'varchar', length: 255, nullable: true })
  copyrightText: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
