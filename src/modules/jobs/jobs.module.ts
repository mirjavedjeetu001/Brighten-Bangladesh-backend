import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobCategoriesService } from './job-categories.service';
import { JobCategoriesController } from './job-categories.controller';
import { Job } from './entities/job.entity';
import { JobCategory } from './entities/job-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobCategory])],
  controllers: [JobsController, JobCategoriesController],
  providers: [JobsService, JobCategoriesService],
  exports: [JobsService, JobCategoriesService],
})
export class JobsModule {}
