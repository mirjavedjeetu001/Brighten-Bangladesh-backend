import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JobCategoriesService } from './job-categories.service';
import { CreateJobCategoryDto, UpdateJobCategoryDto } from './dto/job-category.dto';

@ApiTags('job-categories')
@Controller('job-categories')
export class JobCategoriesController {
  constructor(private readonly jobCategoriesService: JobCategoriesService) {}

  @Get()
  findAll() {
    return this.jobCategoriesService.findAll();
  }

  @Get('all')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAllAdmin() {
    return this.jobCategoriesService.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobCategoriesService.findOne(+id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createDto: CreateJobCategoryDto, @Request() req) {
    return this.jobCategoriesService.create(createDto, req.user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateDto: UpdateJobCategoryDto, @Request() req) {
    return this.jobCategoriesService.update(+id, updateDto, req.user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Request() req) {
    return this.jobCategoriesService.remove(+id, req.user);
  }
}
