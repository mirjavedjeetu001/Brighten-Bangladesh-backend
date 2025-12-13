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
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto, QueryBlogsDto } from './dto/blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({ status: 201, description: 'Blog created successfully' })
  create(@Body() createBlogDto: CreateBlogDto, @CurrentUser() user: User) {
    return this.blogsService.create(createBlogDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blogs' })
  @ApiResponse({ status: 200, description: 'List of blogs' })
  findAll(@Query() queryDto: QueryBlogsDto) {
    const paginationDto = { page: queryDto.page || 1, limit: queryDto.limit || 10 };
    return this.blogsService.findAll(paginationDto, queryDto);
  }

  @Get(':slug')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Get blog by slug' })
  @ApiResponse({ status: 200, description: 'Blog found' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  findOne(@Param('slug') slug: string, @CurrentUser() user: User) {
    return this.blogsService.findOne(slug, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update blog' })
  @ApiResponse({ status: 200, description: 'Blog updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
    @CurrentUser() user: User,
  ) {
    return this.blogsService.update(id, updateBlogDto, user);
  }

  @Post(':id/submit')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit blog for approval' })
  @ApiResponse({ status: 200, description: 'Blog submitted successfully' })
  submit(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.blogsService.submit(id, user);
  }

  @Post(':id/approve')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve blog (Admin/Editor only)' })
  @ApiResponse({ status: 200, description: 'Blog approved successfully' })
  approve(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.blogsService.approve(id, user);
  }

  @Post(':id/publish')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publish blog (Admin/Editor only)' })
  @ApiResponse({ status: 200, description: 'Blog published successfully' })
  publish(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.blogsService.publish(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete blog' })
  @ApiResponse({ status: 200, description: 'Blog deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.blogsService.remove(id, user);
  }

  @Post(':id/view')
  @ApiOperation({ summary: 'Increment view count (public)' })
  @ApiResponse({ status: 200, description: 'View count incremented' })
  incrementView(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.incrementView(id);
  }

  @Post(':id/like')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle like for blog (auth required)' })
  @ApiResponse({ status: 200, description: 'Like toggled' })
  toggleLike(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.blogsService.toggleLike(id, user);
  }

  // Comment endpoints
  @Post(':id/comments')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Add comment to blog (public or authenticated)' })
  @ApiResponse({ status: 201, description: 'Comment added successfully' })
  async createComment(
    @Param('id', ParseIntPipe) blogId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: any,
  ) {
    const user = req.user || null;
    return this.blogsService.createComment(blogId, createCommentDto, user);
  }

  @Get(':id/comments')
  @ApiOperation({ summary: 'Get all comments for a blog' })
  @ApiResponse({ status: 200, description: 'List of comments' })
  getComments(@Param('id', ParseIntPipe) blogId: number) {
    return this.blogsService.getCommentsByBlogId(blogId);
  }

  @Get('comments/all')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all comments (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all comments' })
  getAllComments(@CurrentUser() user: User) {
    return this.blogsService.getAllComments(user);
  }

  @Delete('comments/:commentId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comment (Admin only)' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
  deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @CurrentUser() user: User,
  ) {
    return this.blogsService.deleteComment(commentId, user);
  }
}
