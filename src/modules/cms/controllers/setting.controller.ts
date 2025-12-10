import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SettingService } from '../services/setting.service';
import { UpdateSettingDto, BulkUpdateSettingsDto } from '../dto/setting.dto';
import { Setting } from '../entities/setting.entity';

@ApiTags('CMS - Settings')
@Controller('cms/settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  @ApiOperation({ summary: 'Get all settings' })
  @ApiResponse({ status: 200, description: 'Return all settings' })
  findAll(): Promise<Setting[]> {
    return this.settingService.findAll();
  }

  @Get('object')
  @ApiOperation({ summary: 'Get all settings as key-value object' })
  @ApiResponse({ status: 200, description: 'Return settings object' })
  getAllAsObject(): Promise<Record<string, string>> {
    return this.settingService.getAllAsObject();
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get settings by category' })
  @ApiResponse({ status: 200, description: 'Return settings' })
  findByCategory(@Param('category') category: string): Promise<Setting[]> {
    return this.settingService.findByCategory(category);
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get setting by key' })
  @ApiResponse({ status: 200, description: 'Return setting' })
  findByKey(@Param('key') key: string): Promise<Setting> {
    return this.settingService.findByKey(key);
  }

  @Put(':key')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update setting' })
  @ApiResponse({ status: 200, description: 'Setting updated' })
  update(
    @Param('key') key: string,
    @Body() dto: UpdateSettingDto,
  ): Promise<Setting> {
    return this.settingService.update(key, dto);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bulk update settings' })
  @ApiResponse({ status: 200, description: 'Settings updated' })
  bulkUpdate(@Body() dto: BulkUpdateSettingsDto): Promise<Setting[]> {
    return this.settingService.bulkUpdate(dto.settings);
  }
}
