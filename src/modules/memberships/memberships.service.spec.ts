import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipsService } from './memberships.service';
import { Membership } from './entities/membership.entity';
import { UserActivity, ActivityType } from './entities/user-activity.entity';
import { Blog, BlogStatus } from '../blogs/entities/blog.entity';
import { User } from '../users/entities/user.entity';

describe('MembershipsService', () => {
  let service: MembershipsService;
  let membershipRepository: Repository<Membership>;
  let userActivityRepository: Repository<UserActivity>;
  let blogRepository: Repository<Blog>;
  let userRepository: Repository<User>;

  const mockMembershipRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockUserActivityRepository = {
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getCount: jest.fn(),
    })),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockBlogRepository = {
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getCount: jest.fn(),
    })),
  };

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembershipsService,
        {
          provide: getRepositoryToken(Membership),
          useValue: mockMembershipRepository,
        },
        {
          provide: getRepositoryToken(UserActivity),
          useValue: mockUserActivityRepository,
        },
        {
          provide: getRepositoryToken(Blog),
          useValue: mockBlogRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<MembershipsService>(MembershipsService);
    membershipRepository = module.get(getRepositoryToken(Membership));
    userActivityRepository = module.get(getRepositoryToken(UserActivity));
    blogRepository = module.get(getRepositoryToken(Blog));
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkEligibility', () => {
    it('should return eligible true when all criteria are met', async () => {
      const userId = 1;
      mockUserRepository.findOne.mockResolvedValue({ id: userId });

      const blogQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(5),
      };
      mockBlogRepository.createQueryBuilder.mockReturnValue(blogQueryBuilder);

      const eventQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(2),
      };

      const projectQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(1),
      };

      mockUserActivityRepository.createQueryBuilder
        .mockReturnValueOnce(eventQueryBuilder)
        .mockReturnValueOnce(projectQueryBuilder);

      const result = await service.checkEligibility(userId);

      expect(result.eligible).toBe(true);
      expect(result.rules.blogs).toBe(true);
      expect(result.rules.events).toBe(true);
      expect(result.rules.projects).toBe(true);
      expect(result.counts.approvedBlogsLast30Days).toBe(5);
    });

    it('should return eligible false when blog criteria is not met', async () => {
      const userId = 1;
      mockUserRepository.findOne.mockResolvedValue({ id: userId });

      const blogQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(2), // Less than 4
      };
      mockBlogRepository.createQueryBuilder.mockReturnValue(blogQueryBuilder);

      const eventQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(2),
      };

      const projectQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(1),
      };

      mockUserActivityRepository.createQueryBuilder
        .mockReturnValueOnce(eventQueryBuilder)
        .mockReturnValueOnce(projectQueryBuilder);

      const result = await service.checkEligibility(userId);

      expect(result.eligible).toBe(false);
      expect(result.rules.blogs).toBe(false);
      expect(result.message).toContain('4 approved blogs per month');
    });
  });

  describe('createOrUpdateMembership', () => {
    it('should create membership when user is eligible', async () => {
      const userId = 1;
      const eligibility = {
        eligible: true,
        rules: { blogs: true, events: true, projects: true },
        counts: {
          approvedBlogsLast30Days: 5,
          eventParticipationsLast90Days: 2,
          projectParticipationsLast180Days: 1,
        },
        message: 'Eligible',
      };

      jest.spyOn(service, 'checkEligibility').mockResolvedValue(eligibility);
      mockMembershipRepository.findOne.mockResolvedValue(null);

      const newMembership = {
        id: 1,
        userId,
        membershipId: 'BRIGHT-2025-ABC123',
        status: 'active',
      };

      mockMembershipRepository.create.mockReturnValue(newMembership);
      mockMembershipRepository.save.mockResolvedValue(newMembership);

      const result = await service.createOrUpdateMembership(userId);

      expect(result).toBeDefined();
      expect(mockMembershipRepository.create).toHaveBeenCalled();
      expect(mockMembershipRepository.save).toHaveBeenCalled();
    });

    it('should throw error when user is not eligible', async () => {
      const userId = 1;
      const eligibility = {
        eligible: false,
        rules: { blogs: false, events: true, projects: true },
        counts: {
          approvedBlogsLast30Days: 2,
          eventParticipationsLast90Days: 2,
          projectParticipationsLast180Days: 1,
        },
        message: 'Not eligible',
      };

      jest.spyOn(service, 'checkEligibility').mockResolvedValue(eligibility);

      await expect(service.createOrUpdateMembership(userId)).rejects.toThrow(
        'User is not eligible for membership',
      );
    });
  });
});
