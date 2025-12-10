import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PageService } from '../services/page.service';
import { CreatePageDto, UpdatePageDto } from '../dto/page.dto';
import { Page } from '../entities/page.entity';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';

@ApiTags('CMS - Pages')
@Controller('cms/pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get()
  @ApiOperation({ summary: 'Get all pages' })
  @ApiResponse({ status: 200, description: 'Return all pages' })
  findAll(): Promise<Page[]> {
    return this.pageService.findAll();
  }

  @Get('published')
  @ApiOperation({ summary: 'Get published pages' })
  @ApiResponse({ status: 200, description: 'Return published pages' })
  findAllPublished(): Promise<Page[]> {
    return this.pageService.findAllPublished();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get page by slug' })
  @ApiResponse({ status: 200, description: 'Return page' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  findBySlug(@Param('slug') slug: string): Promise<Page> {
    return this.pageService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get page by ID' })
  @ApiResponse({ status: 200, description: 'Return page' })
  @ApiResponse({ status: 404, description: 'Page not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Page> {
    return this.pageService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create page' })
  @ApiResponse({ status: 201, description: 'Page created' })
  create(@Body() dto: CreatePageDto, @CurrentUser() user: User): Promise<Page> {
    return this.pageService.create(dto, user.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update page' })
  @ApiResponse({ status: 200, description: 'Page updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePageDto,
  ): Promise<Page> {
    return this.pageService.update(id, dto);
  }

  @Patch(':id/publish')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publish page' })
  @ApiResponse({ status: 200, description: 'Page published' })
  publish(@Param('id', ParseIntPipe) id: number): Promise<Page> {
    return this.pageService.publish(id);
  }

  @Patch(':id/unpublish')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unpublish page' })
  @ApiResponse({ status: 200, description: 'Page unpublished' })
  unpublish(@Param('id', ParseIntPipe) id: number): Promise<Page> {
    return this.pageService.unpublish(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete page' })
  @ApiResponse({ status: 200, description: 'Page deleted' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.pageService.remove(id);
  }
}
