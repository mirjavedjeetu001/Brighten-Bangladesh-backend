import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Blog } from './entities/blog.entity';
import { BlogComment } from './entities/blog-comment.entity';
import { UserActivity } from '../memberships/entities/user-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, BlogComment, UserActivity])],
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [BlogsService],
})
export class BlogsModule {}
