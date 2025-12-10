import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from '../entities/setting.entity';
import { UpdateSettingDto } from '../dto/setting.dto';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private settingRepo: Repository<Setting>,
  ) {}

  async findAll(): Promise<Setting[]> {
    return this.settingRepo.find({
      order: { category: 'ASC', setting_key: 'ASC' },
    });
  }

  async findByCategory(category: string): Promise<Setting[]> {
    return this.settingRepo.find({
      where: { category },
      order: { setting_key: 'ASC' },
    });
  }

  async findByKey(key: string): Promise<Setting> {
    const setting = await this.settingRepo.findOne({
      where: { setting_key: key },
    });
    if (!setting) {
      throw new NotFoundException(`Setting with key ${key} not found`);
    }
    return setting;
  }

  async update(key: string, dto: UpdateSettingDto): Promise<Setting> {
    const setting = await this.settingRepo.findOne({
      where: { setting_key: key },
    });

    if (setting) {
      await this.settingRepo.update(setting.id, {
        setting_value: dto.setting_value,
        setting_type: dto.setting_type,
        description: dto.description,
      });
      return this.findByKey(key);
    } else {
      const newSetting = this.settingRepo.create({
        setting_key: key,
        ...dto,
      });
      return this.settingRepo.save(newSetting);
    }
  }

  async bulkUpdate(settings: UpdateSettingDto[]): Promise<Setting[]> {
    const promises = settings.map((setting) =>
      this.update(setting.setting_key, setting),
    );
    return Promise.all(promises);
  }

  // Helper to get settings as key-value object
  async getAllAsObject(): Promise<Record<string, string>> {
    const settings = await this.findAll();
    return settings.reduce((acc, setting) => {
      acc[setting.setting_key] = setting.setting_value;
      return acc;
    }, {});
  }
}
