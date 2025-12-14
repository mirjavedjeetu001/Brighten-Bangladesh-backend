import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Blog, BlogStatus } from './entities/blog.entity';
import { BlogCategory } from './entities/blog-category.entity';
import { BlogComment } from './entities/blog-comment.entity';
import { BlogLike } from './entities/blog-like.entity';
import { CreateBlogDto, UpdateBlogDto, QueryBlogsDto } from './dto/blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User, UserRole } from '../users/entities/user.entity';
import { PaginationDto, PaginatedResult } from '../../common/dto/pagination.dto';
import { UserActivity, ActivityType } from '../memberships/entities/user-activity.entity';
import { MailService } from '../../common/mail/mail.service';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
    @InjectRepository(BlogComment)
    private commentsRepository: Repository<BlogComment>,
    @InjectRepository(BlogLike)
    private likesRepository: Repository<BlogLike>,
    @InjectRepository(UserActivity)
    private userActivityRepository: Repository<UserActivity>,
    @InjectRepository(BlogCategory)
    private categoriesRepository: Repository<BlogCategory>,
    private mailService: MailService,
  ) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .concat('-', Date.now().toString());
  }

  async create(createBlogDto: CreateBlogDto, user: User): Promise<Blog> {
    // Check if user is approved
    if (!user.isApproved) {
      throw new ForbiddenException('Your account must be approved before creating blogs');
    }

    // Members can only create 1 blog per week
    if (user.role === UserRole.MEMBER) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const recentBlogsCount = await this.blogsRepository.count({
        where: {
          authorId: user.id,
        },
      });

      // Get blogs created in the last 7 days
      const recentBlogs = await this.blogsRepository
        .createQueryBuilder('blog')
        .where('blog.author_id = :authorId', { authorId: user.id })
        .andWhere('blog.created_at > :weekAgo', { weekAgo: oneWeekAgo })
        .getCount();

      if (recentBlogs >= 1) {
        throw new ForbiddenException('Members can only create 1 blog per week. Please wait before creating another blog.');
      }
    }

    const slug = this.generateSlug(createBlogDto.title);

    let category: BlogCategory | null = null;
    if (createBlogDto.categoryId) {
      category = await this.categoriesRepository.findOne({ where: { id: Number(createBlogDto.categoryId) } });
      if (!category || !category.isActive) {
        throw new BadRequestException('Invalid category');
      }
    }

    const blog = this.blogsRepository.create({
      ...createBlogDto,
      slug,
      authorId: user.id,
      categoryId: category?.id,
      status: BlogStatus.DRAFT,
    });

    return this.blogsRepository.save(blog);
  }

  async findAll(
    paginationDto: PaginationDto,
    queryDto: QueryBlogsDto,
  ): Promise<PaginatedResult<Blog>> {
    const { page, limit } = paginationDto;
    const { search, status, authorId, categoryId } = queryDto;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Blog> = {};

    if (search) {
      where.title = Like(`%${search}%`);
    }

    if (status) {
      where.status = status;
    }

    if (authorId) {
      where.authorId = parseInt(authorId);
    }

    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }

    const [data, total] = await this.blogsRepository.findAndCount({
      where,
      relations: ['author', 'category'],
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(slug: string, user?: User): Promise<Blog & { likedByMe?: boolean }> {
    const blog = await this.blogsRepository.findOne({
      where: { slug },
      relations: ['author', 'category'],
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    // Ensure counters are current
    const likes = await this.likesRepository.count({ where: { blog_id: blog.id } });
    blog.likesCount = likes;

    // Determine if current user liked
    let likedByMe = false;
    if (user?.id) {
      const existing = await this.likesRepository.findOne({ where: { blog_id: blog.id, user_id: user.id } });
      likedByMe = !!existing;
    }

    return { ...blog, likedByMe } as Blog & { likedByMe?: boolean };
  }

  async getCounts(blogId: number): Promise<{ likes: number; views: number }> {
    const likes = await this.likesRepository.count({ where: { blog_id: blogId } });
    const blog = await this.blogsRepository.findOne({ where: { id: blogId } });
    return { likes, views: blog?.viewCount ?? 0 };
  }

  async incrementView(blogId: number): Promise<{ views: number }> {
    await this.findById(blogId);
    await this.blogsRepository.increment({ id: blogId }, 'viewCount', 1);
    const blog = await this.blogsRepository.findOne({ where: { id: blogId } });
    return { views: blog?.viewCount ?? 0 };
  }

  async toggleLike(blogId: number, user: User): Promise<{ liked: boolean; likes: number }> {
    if (!user) {
      throw new ForbiddenException('Authentication required to like');
    }

    await this.findById(blogId);

    const existing = await this.likesRepository.findOne({ where: { blog_id: blogId, user_id: user.id } });

    if (existing) {
      await this.likesRepository.remove(existing);
      await this.blogsRepository.decrement({ id: blogId }, 'likesCount', 1);
      const likes = await this.likesRepository.count({ where: { blog_id: blogId } });
      return { liked: false, likes };
    }

    const like = this.likesRepository.create({ blog_id: blogId, user_id: user.id });
    await this.likesRepository.save(like);
    await this.blogsRepository.increment({ id: blogId }, 'likesCount', 1);
    const likes = await this.likesRepository.count({ where: { blog_id: blogId } });
    return { liked: true, likes };
  }

  async findById(id: number): Promise<Blog> {
    const blog = await this.blogsRepository.findOne({
      where: { id },
      relations: ['author', 'category'],
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto, user: User): Promise<Blog> {
    const blog = await this.findById(id);

    // Check permissions
    const canEdit =
      blog.authorId === user.id ||
      [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR].includes(user.role);

    if (!canEdit) {
      throw new ForbiddenException('You do not have permission to edit this blog');
    }

    // If slug needs to be regenerated
    if (updateBlogDto.title && updateBlogDto.title !== blog.title) {
      blog.slug = this.generateSlug(updateBlogDto.title);
    }

    if (updateBlogDto.categoryId) {
      const category = await this.categoriesRepository.findOne({ where: { id: Number(updateBlogDto.categoryId) } });
      if (!category || !category.isActive) {
        throw new BadRequestException('Invalid category');
      }
      blog.categoryId = category.id;
    }

    Object.assign(blog, { ...updateBlogDto, categoryId: blog.categoryId });
    return this.blogsRepository.save(blog);
  }

  async submit(id: number, user: User): Promise<Blog> {
    const blog = await this.findById(id);

    if (blog.authorId !== user.id) {
      throw new ForbiddenException('You can only submit your own blogs');
    }

    if (blog.status !== BlogStatus.DRAFT) {
      throw new ForbiddenException('Only draft blogs can be submitted');
    }

    blog.status = BlogStatus.PENDING;
    return this.blogsRepository.save(blog);
  }

  async approve(id: number, user: User): Promise<Blog> {
    const canApprove = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR].includes(
      user.role,
    );

    if (!canApprove) {
      throw new ForbiddenException('You do not have permission to approve blogs');
    }

    const blog = await this.findById(id);

    if (blog.status !== BlogStatus.PENDING) {
      throw new ForbiddenException('Only pending blogs can be approved');
    }

    blog.status = BlogStatus.APPROVED;
    const savedBlog = await this.blogsRepository.save(blog);

    // Record activity for membership eligibility
    await this.userActivityRepository.save({
      userId: blog.authorId,
      type: ActivityType.BLOG_PUBLISHED,
      meta: { blogId: blog.id, blogTitle: blog.title },
    });

    // Notify author
    if (blog.author?.email) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const link = `${frontendUrl.replace(/\/$/, '')}/blogs/${blog.slug}`;
      await this.mailService.sendBlogApprovedEmail(blog.author.email, blog.author.name, blog.title, link);
    }

    return savedBlog;
  }

  async publish(id: number, user: User): Promise<Blog> {
    const canPublish = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR].includes(
      user.role,
    );

    if (!canPublish) {
      throw new ForbiddenException('You do not have permission to publish blogs');
    }

    const blog = await this.findById(id);

    if (blog.status !== BlogStatus.APPROVED) {
      throw new ForbiddenException('Only approved blogs can be published');
    }

    blog.status = BlogStatus.PUBLISHED;
    return this.blogsRepository.save(blog);
  }

  async remove(id: number, user: User): Promise<void> {
    const blog = await this.findById(id);

    const canDelete =
      blog.authorId === user.id ||
      [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR].includes(user.role);

    if (!canDelete) {
      throw new ForbiddenException('You do not have permission to delete this blog');
    }

    await this.blogsRepository.remove(blog);
  }

  // Categories
  async listCategories(): Promise<BlogCategory[]> {
    return this.categoriesRepository.find({ where: { isActive: true }, order: { name: 'ASC' } });
  }

  async listAllCategoriesAdmin(): Promise<BlogCategory[]> {
    return this.categoriesRepository.find({ order: { name: 'ASC' } });
  }

  async createCategory(name: string): Promise<BlogCategory> {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 180);

    const existing = await this.categoriesRepository.findOne({ where: [{ name }, { slug }] });
    if (existing) {
      throw new BadRequestException('Category already exists');
    }

    const category = this.categoriesRepository.create({ name, slug });
    return this.categoriesRepository.save(category);
  }

  async updateCategory(id: number, payload: { name?: string; isActive?: boolean }): Promise<BlogCategory> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (payload.name && payload.name !== category.name) {
      const slug = payload.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .slice(0, 180);
      const dup = await this.categoriesRepository.findOne({ where: [{ name: payload.name }, { slug }] });
      if (dup && dup.id !== id) {
        throw new BadRequestException('Category already exists');
      }
      category.name = payload.name;
      category.slug = slug;
    }

    if (typeof payload.isActive === 'boolean') {
      category.isActive = payload.isActive;
    }

    return this.categoriesRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.categoriesRepository.remove(category);
    await this.blogsRepository.createQueryBuilder()
      .update(Blog)
      .set({ categoryId: null })
      .where('category_id = :id', { id })
      .execute();
  }

  async countApprovedBlogsInDateRange(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    return this.blogsRepository.count({
      where: {
        authorId: userId,
        status: BlogStatus.APPROVED,
      },
      // Note: TypeORM Between would go in where clause with proper setup
    });
  }

  // Comment methods
  async createComment(blogId: number, createCommentDto: CreateCommentDto, user?: User): Promise<BlogComment> {
    const blog = await this.findById(blogId);

    // If not authenticated, require name and email
    if (!user && (!createCommentDto.author_name || !createCommentDto.author_email)) {
      throw new BadRequestException('Name and email are required for guest comments');
    }

    const comment = this.commentsRepository.create({
      content: createCommentDto.content,
      author_name: user ? user.name : createCommentDto.author_name,
      author_email: user ? user.email : createCommentDto.author_email,
      blog_id: blogId,
      user_id: user?.id,
    });

    return this.commentsRepository.save(comment);
  }

  async getCommentsByBlogId(blogId: number): Promise<BlogComment[]> {
    return this.commentsRepository.find({
      where: { blog_id: blogId },
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  async getAllComments(user: User): Promise<BlogComment[]> {
    // Only admins can view all comments
    const canView = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER].includes(user.role);

    if (!canView) {
      throw new ForbiddenException('You do not have permission to view all comments');
    }

    return this.commentsRepository.find({
      relations: ['user', 'blog'],
      order: { created_at: 'DESC' },
    });
  }

  async deleteComment(commentId: number, user: User): Promise<void> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // Only admins can delete any comment
    const canDelete = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER].includes(user.role);

    if (!canDelete) {
      throw new ForbiddenException('You do not have permission to delete this comment');
    }

    await this.commentsRepository.remove(comment);
  }
}
