import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FocusAreaService } from '../services/focus-area.service';
import { CreateFocusAreaDto, UpdateFocusAreaDto } from '../dto/focus-area.dto';
import { FocusArea } from '../entities/focus-area.entity';

@ApiTags('CMS - Focus Areas')
@Controller('cms/focus-areas')
export class FocusAreaController {
  constructor(private readonly focusAreaService: FocusAreaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all focus areas' })
  @ApiResponse({ status: 200, description: 'Return all focus areas' })
  findAll(): Promise<FocusArea[]> {
    return this.focusAreaService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active focus areas' })
  @ApiResponse({ status: 200, description: 'Return active focus areas' })
  findAllActive(): Promise<FocusArea[]> {
    return this.focusAreaService.findAllActive();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get focus area by slug' })
  @ApiResponse({ status: 200, description: 'Return focus area' })
  findBySlug(@Param('slug') slug: string): Promise<FocusArea> {
    return this.focusAreaService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get focus area by ID' })
  @ApiResponse({ status: 200, description: 'Return focus area' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FocusArea> {
    return this.focusAreaService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create focus area' })
  @ApiResponse({ status: 201, description: 'Focus area created' })
  create(@Body() dto: CreateFocusAreaDto): Promise<FocusArea> {
    return this.focusAreaService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update focus area' })
  @ApiResponse({ status: 200, description: 'Focus area updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFocusAreaDto,
  ): Promise<FocusArea> {
    return this.focusAreaService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete focus area' })
  @ApiResponse({ status: 200, description: 'Focus area deleted' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.focusAreaService.remove(id);
  }
}
