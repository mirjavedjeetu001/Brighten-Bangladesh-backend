import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { WebsiteAnalytics } from '../entities/website-analytics.entity';

@Injectable()
export class WebsiteAnalyticsService {
  constructor(
    @InjectRepository(WebsiteAnalytics)
    private analyticsRepository: Repository<WebsiteAnalytics>,
  ) {}

  async trackPageView(): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    
    let analytics = await this.analyticsRepository.findOne({
      where: { date: today },
    });

    if (analytics) {
      analytics.pageViews += 1;
      await this.analyticsRepository.save(analytics);
    } else {
      analytics = this.analyticsRepository.create({
        date: today,
        pageViews: 1,
        uniqueVisitors: 1,
      });
      await this.analyticsRepository.save(analytics);
    }
  }

  async trackUniqueVisitor(): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    
    let analytics = await this.analyticsRepository.findOne({
      where: { date: today },
    });

    if (analytics) {
      analytics.uniqueVisitors += 1;
      await this.analyticsRepository.save(analytics);
    } else {
      analytics = this.analyticsRepository.create({
        date: today,
        pageViews: 1,
        uniqueVisitors: 1,
      });
      await this.analyticsRepository.save(analytics);
    }
  }

  async getStats(): Promise<{
    totalPageViews: number;
    totalUniqueVisitors: number;
    todayPageViews: number;
    todayUniqueVisitors: number;
    last30Days: Array<{ date: string; pageViews: number; uniqueVisitors: number }>;
  }> {
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

    // Get today's stats
    const todayStats = await this.analyticsRepository.findOne({
      where: { date: today },
    });

    // Get total stats
    const totalStats = await this.analyticsRepository
      .createQueryBuilder('analytics')
      .select('SUM(analytics.pageViews)', 'totalPageViews')
      .addSelect('SUM(analytics.uniqueVisitors)', 'totalUniqueVisitors')
      .getRawOne();

    // Get last 30 days
    const last30Days = await this.analyticsRepository.find({
      where: {
        date: Between(thirtyDaysAgoStr, today),
      },
      order: { date: 'DESC' },
    });

    return {
      totalPageViews: parseInt(totalStats?.totalPageViews || '0'),
      totalUniqueVisitors: parseInt(totalStats?.totalUniqueVisitors || '0'),
      todayPageViews: todayStats?.pageViews || 0,
      todayUniqueVisitors: todayStats?.uniqueVisitors || 0,
      last30Days: last30Days.map(d => ({
        date: d.date,
        pageViews: d.pageViews,
        uniqueVisitors: d.uniqueVisitors,
      })),
    };
  }
}
