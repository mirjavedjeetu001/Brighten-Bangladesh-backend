import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeroSlider } from '../entities/hero-slider.entity';
import { CreateHeroSliderDto, UpdateHeroSliderDto } from '../dto/hero-slider.dto';

@Injectable()
export class HeroSliderService {
  constructor(
    @InjectRepository(HeroSlider)
    private heroSliderRepo: Repository<HeroSlider>,
  ) {}

  async findAll(): Promise<HeroSlider[]> {
    return this.heroSliderRepo.find({
      order: { display_order: 'ASC', created_at: 'DESC' },
    });
  }

  async findAllActive(): Promise<HeroSlider[]> {
    return this.heroSliderRepo.find({
      where: { is_active: true },
      order: { display_order: 'ASC' },
    });
  }

  async findOne(id: number): Promise<HeroSlider> {
    const slider = await this.heroSliderRepo.findOne({ where: { id } });
    if (!slider) {
      throw new NotFoundException(`Hero slider with ID ${id} not found`);
    }
    return slider;
  }

  async create(dto: CreateHeroSliderDto): Promise<HeroSlider> {
    const slider = this.heroSliderRepo.create(dto);
    return this.heroSliderRepo.save(slider);
  }

  async update(id: number, dto: UpdateHeroSliderDto): Promise<HeroSlider> {
    await this.findOne(id);
    await this.heroSliderRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.heroSliderRepo.delete(id);
  }

  async reorder(ids: number[]): Promise<void> {
    for (let i = 0; i < ids.length; i++) {
      await this.heroSliderRepo.update(ids[i], { display_order: i + 1 });
    }
  }
}
