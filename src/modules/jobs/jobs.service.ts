import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto, UpdateJobDto, QueryJobsDto } from './dto/job.dto';
import { User, UserRole } from '../users/entities/user.entity';
import { PaginationDto, PaginatedResult } from '../../common/dto/pagination.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .concat('-', Date.now().toString());
  }

  async create(createJobDto: CreateJobDto, user: User): Promise<Job> {
    const canCreate = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR].includes(
      user.role,
    );

    if (!canCreate) {
      throw new ForbiddenException('You do not have permission to create jobs');
    }

    const slug = this.generateSlug(createJobDto.title);

    const job = this.jobsRepository.create({
      ...createJobDto,
      slug,
    });

    return this.jobsRepository.save(job);
  }

  async findAll(
    paginationDto: PaginationDto,
    queryDto: QueryJobsDto,
  ): Promise<PaginatedResult<Job>> {
    const { page, limit } = paginationDto;
    const { search, jobType, activeOnly } = queryDto;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Job> = {};

    if (search) {
      where.title = Like(`%${search}%`);
    }

    if (jobType) {
      where.jobType = jobType;
    }

    if (queryDto.categoryId) {
      where.categoryId = queryDto.categoryId;
    }

    if (activeOnly) {
      where.isActive = true;
    }

    const [data, total] = await this.jobsRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findActive(): Promise<Job[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    const jobs = await this.jobsRepository.find({
      where: {
        isActive: true,
      },
      order: { createdAt: 'DESC' },
    });

    // Filter out jobs with expired deadlines
    return jobs.filter(job => {
      if (!job.deadline) return true; // No deadline = always active
      const deadlineDate = new Date(job.deadline);
      deadlineDate.setHours(23, 59, 59, 999); // End of deadline day
      return deadlineDate >= today;
    });
  }

  async findOne(slug: string): Promise<Job> {
    const job = await this.jobsRepository.findOne({
      where: { slug },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  async findById(id: number): Promise<Job> {
    const job = await this.jobsRepository.findOne({
      where: { id },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto, user: User): Promise<Job> {
    const canUpdate = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR].includes(
      user.role,
    );

    if (!canUpdate) {
      throw new ForbiddenException('You do not have permission to update jobs');
    }

    const job = await this.findById(id);

    if (updateJobDto.title && updateJobDto.title !== job.title) {
      job.slug = this.generateSlug(updateJobDto.title);
    }

    Object.assign(job, updateJobDto);
    return this.jobsRepository.save(job);
  }

  async remove(id: number, user: User): Promise<void> {
    const canDelete = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR].includes(
      user.role,
    );

    if (!canDelete) {
      throw new ForbiddenException('You do not have permission to delete jobs');
    }

    const job = await this.findById(id);
    await this.jobsRepository.remove(job);
  }
}
