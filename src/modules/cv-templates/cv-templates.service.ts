import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvTemplate } from './entities/cv-template.entity';
import { CreateCvTemplateDto, UpdateCvTemplateDto } from './dto/cv-template.dto';

@Injectable()
export class CvTemplatesService {
  constructor(
    @InjectRepository(CvTemplate)
    private cvTemplatesRepository: Repository<CvTemplate>,
  ) {}

  async create(createDto: CreateCvTemplateDto): Promise<CvTemplate> {
    const template = this.cvTemplatesRepository.create(createDto);
    const saved = await this.cvTemplatesRepository.save(template);

    if (saved.isActive) {
      await this.deactivateOtherTemplates(saved.id);
    }

    return saved;
  }

  async findAll(): Promise<CvTemplate[]> {
    return await this.cvTemplatesRepository.find({
      order: { displayOrder: 'ASC', name: 'ASC' },
    });
  }

  async findActive(): Promise<CvTemplate[]> {
    return await this.cvTemplatesRepository.find({
      where: { isActive: true },
      order: { displayOrder: 'ASC', name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<CvTemplate> {
    const template = await this.cvTemplatesRepository.findOne({ where: { id } });
    if (!template) {
      throw new NotFoundException(`CV Template with ID ${id} not found`);
    }
    return template;
  }

  async update(id: number, updateDto: UpdateCvTemplateDto): Promise<CvTemplate> {
    const template = await this.findOne(id);
    Object.assign(template, updateDto);
    const saved = await this.cvTemplatesRepository.save(template);

    if (saved.isActive) {
      await this.deactivateOtherTemplates(saved.id);
    }

    return saved;
  }

  async remove(id: number): Promise<void> {
    const template = await this.findOne(id);
    await this.cvTemplatesRepository.remove(template);
  }

  async updateDisplayOrder(id: number, displayOrder: number): Promise<CvTemplate> {
    const template = await this.findOne(id);
    template.displayOrder = displayOrder;
    return await this.cvTemplatesRepository.save(template);
  }

  async toggleActive(id: number): Promise<CvTemplate> {
    const template = await this.findOne(id);
    template.isActive = !template.isActive;
    const saved = await this.cvTemplatesRepository.save(template);

    if (saved.isActive) {
      await this.deactivateOtherTemplates(saved.id);
    }

    return saved;
  }

  private async deactivateOtherTemplates(activeTemplateId: number): Promise<void> {
    await this.cvTemplatesRepository
      .createQueryBuilder()
      .update(CvTemplate)
      .set({ isActive: false })
      .where('id != :id', { id: activeTemplateId })
      .execute();
  }
}
