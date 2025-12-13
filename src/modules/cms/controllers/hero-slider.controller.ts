import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Patch, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HeroSliderService } from '../services/hero-slider.service';
import { CreateHeroSliderDto, UpdateHeroSliderDto, ReorderHeroSliderDto } from '../dto/hero-slider.dto';
import { HeroSlider } from '../entities/hero-slider.entity';

@ApiTags('CMS - Hero Sliders')
@Controller('cms/hero-sliders')
export class HeroSliderController {
  constructor(private readonly heroSliderService: HeroSliderService) {}

  @Get()
  @ApiOperation({ summary: 'Get all hero sliders' })
  @ApiResponse({ status: 200, description: 'Return all hero sliders' })
  findAll(): Promise<HeroSlider[]> {
    return this.heroSliderService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active hero sliders' })
  @ApiResponse({ status: 200, description: 'Return active hero sliders' })
  findAllActive(): Promise<HeroSlider[]> {
    return this.heroSliderService.findAllActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hero slider by ID' })
  @ApiResponse({ status: 200, description: 'Return hero slider' })
  @ApiResponse({ status: 404, description: 'Hero slider not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<HeroSlider> {
    return this.heroSliderService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create hero slider (Admin/Content Manager)' })
  @ApiResponse({ status: 201, description: 'Hero slider created' })
  create(@Body() dto: CreateHeroSliderDto): Promise<HeroSlider> {
    return this.heroSliderService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update hero slider' })
  @ApiResponse({ status: 200, description: 'Hero slider updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHeroSliderDto,
  ): Promise<HeroSlider> {
    return this.heroSliderService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete hero slider' })
  @ApiResponse({ status: 200, description: 'Hero slider deleted' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.heroSliderService.remove(id);
  }

  @Patch('reorder')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reorder hero sliders' })
  @ApiResponse({ status: 200, description: 'Hero sliders reordered' })
  reorder(@Body() dto: ReorderHeroSliderDto & { orders?: { id: number; display_order?: number }[] }): Promise<void> {
    const order = dto.order ?? dto.orders?.map((item) => item.id) ?? [];
    if (!order.length) {
      throw new BadRequestException('order array is required');
    }
    return this.heroSliderService.reorder(order);
  }
}
