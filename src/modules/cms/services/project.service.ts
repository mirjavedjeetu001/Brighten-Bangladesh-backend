import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { User, UserRole } from '../../users/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  private canManageProjects(user: User): boolean {
    return [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER].includes(user.role);
  }

  async create(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
    if (!this.canManageProjects(user)) {
      throw new ForbiddenException('You do not have permission to create projects');
    }

    const project = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      order: { display_order: 'ASC', created_at: 'DESC' },
    });
  }

  async findAllActive(): Promise<Project[]> {
    return this.projectRepository.find({
      where: { is_active: true },
      order: { display_order: 'ASC', created_at: 'DESC' },
    });
  }

  async findFeatured(): Promise<Project[]> {
    return this.projectRepository.find({
      where: { is_active: true, is_featured: true },
      order: { created_at: 'DESC' },
      take: 3,
    });
  }

  async findByStatus(status: string): Promise<Project[]> {
    return this.projectRepository.find({
      where: { is_active: true, status: status as any },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async findBySlug(slug: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { slug } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto, user: User): Promise<Project> {
    if (!this.canManageProjects(user)) {
      throw new ForbiddenException('You do not have permission to update projects');
    }

    const project = await this.findOne(id);
    Object.assign(project, updateProjectDto);
    return this.projectRepository.save(project);
  }

  async remove(id: number, user: User): Promise<void> {
    if (!this.canManageProjects(user)) {
      throw new ForbiddenException('You do not have permission to delete projects');
    }

    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }
}
