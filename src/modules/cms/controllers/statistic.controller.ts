import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StatisticService } from '../services/statistic.service';
import { BulkUpdateStatisticsDto } from '../dto/statistic.dto';
import { Statistic } from '../entities/statistic.entity';

@ApiTags('CMS - Statistics')
@Controller('cms/statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get()
  @ApiOperation({ summary: 'Get all statistics' })
  @ApiResponse({ status: 200, description: 'Return all statistics' })
  findAll(): Promise<Statistic[]> {
    return this.statisticService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active statistics' })
  @ApiResponse({ status: 200, description: 'Return active statistics' })
  findAllActive(): Promise<Statistic[]> {
    return this.statisticService.findAllActive();
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bulk update statistics' })
  @ApiResponse({ status: 200, description: 'Statistics updated' })
  bulkUpdate(@Body() dto: BulkUpdateStatisticsDto): Promise<Statistic[]> {
    return this.statisticService.bulkUpdate(dto.statistics);
  }
}
