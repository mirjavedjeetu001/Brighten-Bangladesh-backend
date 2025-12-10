import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Magazine } from './entities/magazine.entity';
import { CreateMagazineDto, UpdateMagazineDto } from './dto/magazine.dto';
import { PaginationDto, PaginatedResult } from '../../common/dto/pagination.dto';

@Injectable()
export class MagazinesService {
  constructor(
    @InjectRepository(Magazine)
    private magazinesRepository: Repository<Magazine>,
  ) {}

  async create(createMagazineDto: CreateMagazineDto): Promise<Magazine> {
    const magazine = this.magazinesRepository.create(createMagazineDto);
    return this.magazinesRepository.save(magazine);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Magazine>> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.magazinesRepository.findAndCount({
      skip,
      take: limit,
      order: { publishDate: 'DESC', createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Magazine> {
    const magazine = await this.magazinesRepository.findOne({ where: { id } });

    if (!magazine) {
      throw new NotFoundException('Magazine not found');
    }

    return magazine;
  }

  async update(id: number, updateMagazineDto: UpdateMagazineDto): Promise<Magazine> {
    const magazine = await this.findOne(id);
    Object.assign(magazine, updateMagazineDto);
    return this.magazinesRepository.save(magazine);
  }

  async remove(id: number): Promise<void> {
    const magazine = await this.findOne(id);
    await this.magazinesRepository.remove(magazine);
  }
}
