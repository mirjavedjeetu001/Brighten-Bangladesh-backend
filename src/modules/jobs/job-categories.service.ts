import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobCategory } from './entities/job-category.entity';
import { CreateJobCategoryDto, UpdateJobCategoryDto } from './dto/job-category.dto';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class JobCategoriesService {
  constructor(
    @InjectRepository(JobCategory)
    private jobCategoryRepository: Repository<JobCategory>,
  ) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async findAll(): Promise<JobCategory[]> {
    return this.jobCategoryRepository.find({
      where: { isActive: true },
      order: { displayOrder: 'ASC', name: 'ASC' },
    });
  }

  async findAllAdmin(): Promise<JobCategory[]> {
    return this.jobCategoryRepository.find({
      order: { displayOrder: 'ASC', name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<JobCategory> {
    const category = await this.jobCategoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Job category not found');
    }
    return category;
  }

  async create(createDto: CreateJobCategoryDto, user: User): Promise<JobCategory> {
    const canCreate = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER].includes(user.role);
    if (!canCreate) {
      throw new ForbiddenException('You do not have permission to create job categories');
    }

    const slug = this.generateSlug(createDto.name);
    const category = this.jobCategoryRepository.create({
      ...createDto,
      slug,
    });

    return this.jobCategoryRepository.save(category);
  }

  async update(id: number, updateDto: UpdateJobCategoryDto, user: User): Promise<JobCategory> {
    const canUpdate = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER].includes(user.role);
    if (!canUpdate) {
      throw new ForbiddenException('You do not have permission to update job categories');
    }

    const category = await this.findOne(id);

    if (updateDto.name && updateDto.name !== category.name) {
      category.slug = this.generateSlug(updateDto.name);
    }

    Object.assign(category, updateDto);
    return this.jobCategoryRepository.save(category);
  }

  async remove(id: number, user: User): Promise<void> {
    const canDelete = [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(user.role);
    if (!canDelete) {
      throw new ForbiddenException('You do not have permission to delete job categories');
    }

    const category = await this.findOne(id);
    await this.jobCategoryRepository.remove(category);
  }
}
