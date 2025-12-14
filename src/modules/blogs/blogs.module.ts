import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { ShareController } from './share.controller';
import { BlogCategoriesController } from './blog-categories.controller';
import { Blog } from './entities/blog.entity';
import { BlogComment } from './entities/blog-comment.entity';
import { BlogLike } from './entities/blog-like.entity';
import { UserActivity } from '../memberships/entities/user-activity.entity';
import { BlogCategory } from './entities/blog-category.entity';
import { MailService } from '../../common/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, BlogComment, BlogLike, BlogCategory, UserActivity])],
  controllers: [BlogsController, ShareController, BlogCategoriesController],
  providers: [BlogsService, MailService],
  exports: [BlogsService],
})
export class BlogsModule {}
