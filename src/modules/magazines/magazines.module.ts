import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagazinesService } from './magazines.service';
import { MagazinesController } from './magazines.controller';
import { Magazine } from './entities/magazine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Magazine])],
  controllers: [MagazinesController],
  providers: [MagazinesService],
  exports: [MagazinesService],
})
export class MagazinesModule {}
