import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BlogsService } from './blogs.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Blog Categories')
@Controller('blog-categories')
export class BlogCategoriesController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  @ApiOperation({ summary: 'List active blog categories (public)' })
  list() {
    return this.blogsService.listCategories();
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all categories (admin)' })
  listAll(@CurrentUser() user: User) {
    this.ensureAdmin(user);
    return this.blogsService.listAllCategoriesAdmin();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create category (admin)' })
  @ApiResponse({ status: 201, description: 'Category created' })
  create(@Body('name') name: string, @CurrentUser() user: User) {
    this.ensureAdmin(user);
    return this.blogsService.createCategory(name);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update category (admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: { name?: string; isActive?: boolean },
    @CurrentUser() user: User,
  ) {
    this.ensureAdmin(user);
    return this.blogsService.updateCategory(id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete category (admin)' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    this.ensureAdmin(user);
    return this.blogsService.deleteCategory(id);
  }

  private ensureAdmin(user: User) {
    const allowed = ['super_admin', 'admin', 'content_manager', 'editor'];
    if (!user || !allowed.includes(user.role)) {
      throw new ForbiddenException('Only admins can manage categories');
    }
  }
}
