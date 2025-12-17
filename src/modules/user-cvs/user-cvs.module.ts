import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCv } from './entities/user-cv.entity';
import { UserCvsService } from './user-cvs.service';
import { UserCvsController, CmsUserCvsController } from './user-cvs.controller';
import { CvRenderService } from './cv-render.service';
import { CvTemplatesModule } from '../cv-templates/cv-templates.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserCv]),
    CvTemplatesModule,
  ],
  controllers: [UserCvsController, CmsUserCvsController],
  providers: [UserCvsService, CvRenderService],
  exports: [UserCvsService],
})
export class UserCvsModule {}
