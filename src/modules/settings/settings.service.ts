import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSettings } from './entities/system-settings.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SystemSettings)
    private settingsRepository: Repository<SystemSettings>,
  ) {}

  async getSettings(): Promise<SystemSettings> {
    let settings = await this.settingsRepository.findOne({ where: {} });
    
    if (!settings) {
      // Create default settings if none exist
      settings = this.settingsRepository.create({
        siteName: 'Brighten Bangladesh',
        siteTagline: 'Empowering Communities Through Education and Development',
        primaryColor: '#0d9488',
        secondaryColor: '#f97316',
        memberBlogLimit: 1,
        blogLimitPeriodDays: 7,
        volunteerBlogLimit: 2,
        editorBlogLimit: 5,
        minBlogsForMembership: 4,
        minEventsForMembership: 1,
        minProjectsForMembership: 1,
        copyrightText: '© 2025 Brighten Bangladesh. All rights reserved.',
      });
      await this.settingsRepository.save(settings);
    }
    
    return settings;
  }

  async updateSettings(updates: Partial<SystemSettings>): Promise<SystemSettings> {
    let settings = await this.settingsRepository.findOne({ where: {} });
    
    if (!settings) {
      settings = this.settingsRepository.create(updates);
    } else {
      Object.assign(settings, updates);
    }
    
    return this.settingsRepository.save(settings);
  }

  async getBlogLimit(role: string): Promise<{ limit: number; periodDays: number }> {
    const settings = await this.getSettings();
    
    let limit: number;
    switch (role) {
      case 'member':
        limit = settings.memberBlogLimit;
        break;
      case 'volunteer':
        limit = settings.volunteerBlogLimit;
        break;
      case 'editor':
        limit = settings.editorBlogLimit;
        break;
      default:
        limit = 999; // Unlimited for admins/super_admins/content_managers
    }
    
    return {
      limit,
      periodDays: settings.blogLimitPeriodDays,
    };
  }
}
