import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto, UpdateJobDto, QueryJobsDto } from './dto/job.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new job (Admin only)' })
  @ApiResponse({ status: 201, description: 'Job created successfully' })
  create(@Body() createJobDto: CreateJobDto, @CurrentUser() user: User) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({ status: 200, description: 'List of jobs' })
  findAll(@Query() queryDto: QueryJobsDto) {
    const paginationDto = { page: queryDto.page || 1, limit: queryDto.limit || 10 };
    return this.jobsService.findAll(paginationDto, queryDto);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active jobs (public)' })
  @ApiResponse({ status: 200, description: 'List of active jobs' })
  findActive() {
    return this.jobsService.findActive();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get job by slug' })
  @ApiResponse({ status: 200, description: 'Job found' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  findOne(@Param('slug') slug: string) {
    return this.jobsService.findOne(slug);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update job (Admin only)' })
  @ApiResponse({ status: 200, description: 'Job updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobDto: UpdateJobDto,
    @CurrentUser() user: User,
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete job (Admin only)' })
  @ApiResponse({ status: 200, description: 'Job deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.jobsService.remove(id, user);
  }
}
