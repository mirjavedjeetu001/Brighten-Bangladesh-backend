import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import { Membership, MembershipStatus } from './entities/membership.entity';
import { UserActivity, ActivityType } from './entities/user-activity.entity';
import { Blog, BlogStatus } from '../blogs/entities/blog.entity';
import { User } from '../users/entities/user.entity';
import {
  EligibilityResult,
  EligibilityRules,
  EligibilityCounts,
} from './interfaces/eligibility.interface';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
    @InjectRepository(UserActivity)
    private userActivityRepository: Repository<UserActivity>,
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private generateMembershipId(): string {
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `BRIGHT-${year}-${random}`;
  }

  async checkEligibility(userId: number): Promise<EligibilityResult> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const ninetyDaysAgo = new Date(now);
    ninetyDaysAgo.setDate(now.getDate() - 90);

    const oneEightyDaysAgo = new Date(now);
    oneEightyDaysAgo.setDate(now.getDate() - 180);

    // Count approved and published blogs in last 30 days
    const approvedBlogsLast30Days = await this.blogRepository
      .createQueryBuilder('blog')
      .where('blog.author_id = :userId', { userId })
      .andWhere('blog.status IN (:...statuses)', { statuses: [BlogStatus.APPROVED, BlogStatus.PUBLISHED] })
      .andWhere('blog.created_at >= :startDate', { startDate: thirtyDaysAgo })
      .getCount();

    // Count event participations in last 90 days
    const eventParticipationsLast90Days = await this.userActivityRepository
      .createQueryBuilder('activity')
      .where('activity.user_id = :userId', { userId })
      .andWhere('activity.type = :type', { type: ActivityType.EVENT_PARTICIPATION })
      .andWhere('activity.created_at >= :startDate', { startDate: ninetyDaysAgo })
      .getCount();

    // Count project participations in last 180 days
    const projectParticipationsLast180Days = await this.userActivityRepository
      .createQueryBuilder('activity')
      .where('activity.user_id = :userId', { userId })
      .andWhere('activity.type = :type', { type: ActivityType.PROJECT_PARTICIPATION })
      .andWhere('activity.created_at >= :startDate', { startDate: oneEightyDaysAgo })
      .getCount();

    const counts: EligibilityCounts = {
      approvedBlogsLast30Days,
      eventParticipationsLast90Days,
      projectParticipationsLast180Days,
    };

    const rules: EligibilityRules = {
      blogs: approvedBlogsLast30Days >= 4,
      events: eventParticipationsLast90Days >= 1,
      projects: projectParticipationsLast180Days >= 1,
    };

    const eligible = Object.values(rules).every(Boolean);

    let message = '';
    if (eligible) {
      message = 'Congratulations! You are eligible for membership.';
    } else {
      const failedRules = [];
      if (!rules.blogs) failedRules.push('4 approved blogs per month');
      if (!rules.events) failedRules.push('1 event participation every 3 months');
      if (!rules.projects) failedRules.push('1 project participation every 6 months');
      message = `You need: ${failedRules.join(', ')}`;
    }

    return {
      eligible,
      rules,
      counts,
      message,
    };
  }

  async createOrUpdateMembership(userId: number): Promise<Membership> {
    const eligibility = await this.checkEligibility(userId);

    if (!eligibility.eligible) {
      throw new Error('User is not eligible for membership');
    }

    // Check if user already has an active membership
    let membership = await this.membershipRepository.findOne({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    const now = new Date();
    const oneYearLater = new Date(now);
    oneYearLater.setFullYear(now.getFullYear() + 1);

    if (membership) {
      // Update existing membership
      membership.status = MembershipStatus.ACTIVE;
      membership.validFrom = now;
      membership.validTo = oneYearLater;
      membership.criteria = eligibility;
      
      if (!membership.membershipId) {
        membership.membershipId = this.generateMembershipId();
      }
    } else {
      // Create new membership
      membership = this.membershipRepository.create({
        userId,
        membershipId: this.generateMembershipId(),
        status: MembershipStatus.ACTIVE,
        validFrom: now,
        validTo: oneYearLater,
        criteria: eligibility,
      });
    }

    return this.membershipRepository.save(membership);
  }

  async getUserMembership(userId: number): Promise<Membership | null> {
    return this.membershipRepository.findOne({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async getAllMemberships() {
    return this.membershipRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async createActivity(userId: number, type: string, meta: any): Promise<UserActivity> {
    const activity = this.userActivityRepository.create({
      userId,
      type,
      meta,
    });

    return this.userActivityRepository.save(activity);
  }

  async getUserActivities(userId: number): Promise<UserActivity[]> {
    return this.userActivityRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}
