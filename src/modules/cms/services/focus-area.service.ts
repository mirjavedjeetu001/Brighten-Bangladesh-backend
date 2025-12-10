import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FocusArea } from '../entities/focus-area.entity';
import { CreateFocusAreaDto, UpdateFocusAreaDto } from '../dto/focus-area.dto';

@Injectable()
export class FocusAreaService {
  constructor(
    @InjectRepository(FocusArea)
    private focusAreaRepo: Repository<FocusArea>,
  ) {}

  async findAll(): Promise<FocusArea[]> {
    return this.focusAreaRepo.find({
      order: { display_order: 'ASC', created_at: 'DESC' },
    });
  }

  async findAllActive(): Promise<FocusArea[]> {
    return this.focusAreaRepo.find({
      where: { is_active: true },
      order: { display_order: 'ASC' },
    });
  }

  async findOne(id: number): Promise<FocusArea> {
    const focusArea = await this.focusAreaRepo.findOne({ where: { id } });
    if (!focusArea) {
      throw new NotFoundException(`Focus area with ID ${id} not found`);
    }
    return focusArea;
  }

  async findBySlug(slug: string): Promise<FocusArea> {
    const focusArea = await this.focusAreaRepo.findOne({ where: { slug } });
    if (!focusArea) {
      throw new NotFoundException(`Focus area with slug ${slug} not found`);
    }
    return focusArea;
  }

  async create(dto: CreateFocusAreaDto): Promise<FocusArea> {
    const focusArea = this.focusAreaRepo.create(dto);
    return this.focusAreaRepo.save(focusArea);
  }

  async update(id: number, dto: UpdateFocusAreaDto): Promise<FocusArea> {
    await this.findOne(id);
    await this.focusAreaRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.focusAreaRepo.delete(id);
  }
}
