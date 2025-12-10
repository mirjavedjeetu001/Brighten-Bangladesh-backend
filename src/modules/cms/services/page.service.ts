import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '../entities/page.entity';
import { CreatePageDto, UpdatePageDto } from '../dto/page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private pageRepo: Repository<Page>,
  ) {}

  async findAll(): Promise<Page[]> {
    return this.pageRepo.find({
      relations: ['creator'],
      order: { created_at: 'DESC' },
    });
  }

  async findAllPublished(): Promise<Page[]> {
    return this.pageRepo.find({
      where: { is_published: true },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Page> {
    const page = await this.pageRepo.findOne({
      where: { id },
      relations: ['creator'],
    });
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  async findBySlug(slug: string): Promise<Page> {
    const page = await this.pageRepo.findOne({
      where: { slug },
      relations: ['creator'],
    });
    if (!page) {
      throw new NotFoundException(`Page with slug ${slug} not found`);
    }
    return page;
  }

  async create(dto: CreatePageDto, userId: number): Promise<Page> {
    // Check if slug already exists
    const existing = await this.pageRepo.findOne({ where: { slug: dto.slug } });
    if (existing) {
      throw new ConflictException(`Page with slug ${dto.slug} already exists`);
    }

    const page = this.pageRepo.create({
      ...dto,
      created_by: userId,
    });
    return this.pageRepo.save(page);
  }

  async update(id: number, dto: UpdatePageDto): Promise<Page> {
    await this.findOne(id);

    // Check slug uniqueness if changed
    if (dto.slug) {
      const existing = await this.pageRepo.findOne({ where: { slug: dto.slug } });
      if (existing && existing.id !== id) {
        throw new ConflictException(`Page with slug ${dto.slug} already exists`);
      }
    }

    await this.pageRepo.update(id, dto);
    return this.findOne(id);
  }

  async publish(id: number): Promise<Page> {
    await this.findOne(id);
    await this.pageRepo.update(id, {
      is_published: true,
      published_at: new Date(),
    });
    return this.findOne(id);
  }

  async unpublish(id: number): Promise<Page> {
    await this.findOne(id);
    await this.pageRepo.update(id, { is_published: false });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.pageRepo.delete(id);
  }
}
