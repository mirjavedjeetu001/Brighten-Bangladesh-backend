import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvTemplate } from './entities/cv-template.entity';
import { CvTemplatesService } from './cv-templates.service';
import { CvTemplatesController, PublicCvTemplatesController } from './cv-templates.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CvTemplate])],
  controllers: [CvTemplatesController, PublicCvTemplatesController],
  providers: [CvTemplatesService],
  exports: [CvTemplatesService],
})
export class CvTemplatesModule {}
