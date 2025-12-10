import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistic } from '../entities/statistic.entity';
import { CreateStatisticDto, UpdateStatisticDto } from '../dto/statistic.dto';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Statistic)
    private statisticRepo: Repository<Statistic>,
  ) {}

  async findAll(): Promise<Statistic[]> {
    return this.statisticRepo.find({
      order: { display_order: 'ASC', created_at: 'DESC' },
    });
  }

  async findAllActive(): Promise<Statistic[]> {
    return this.statisticRepo.find({
      where: { is_active: true },
      order: { display_order: 'ASC' },
    });
  }

  async bulkUpdate(statistics: UpdateStatisticDto[]): Promise<Statistic[]> {
    const promises = statistics.map(async (stat) => {
      if (stat['id']) {
        await this.statisticRepo.update(stat['id'], stat);
        return this.statisticRepo.findOne({ where: { id: stat['id'] } });
      } else {
        return this.statisticRepo.save(this.statisticRepo.create(stat));
      }
    });
    return Promise.all(promises);
  }
}
