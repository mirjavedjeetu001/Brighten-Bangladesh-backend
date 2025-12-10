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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectService } from '../services/project.service';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';

@ApiTags('Projects')
@Controller('cms/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create project (Admin only)' })
  create(@Body() createProjectDto: CreateProjectDto, @CurrentUser() user: User) {
    return this.projectService.create(createProjectDto, user);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active projects' })
  findAllActive() {
    return this.projectService.findAllActive();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured projects' })
  findFeatured() {
    return this.projectService.findFeatured();
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get projects by status' })
  findByStatus(@Param('status') status: string) {
    return this.projectService.findByStatus(status);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get project by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.projectService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  findAll() {
    return this.projectService.findAll();
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update project (Admin only)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser() user: User,
  ) {
    return this.projectService.update(id, updateProjectDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete project (Admin only)' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.projectService.remove(id, user);
  }
}
