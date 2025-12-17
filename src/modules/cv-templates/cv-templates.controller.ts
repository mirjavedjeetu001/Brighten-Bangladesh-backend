import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { CvTemplatesService } from './cv-templates.service';
import { CreateCvTemplateDto, UpdateCvTemplateDto } from './dto/cv-template.dto';

@ApiTags('CMS - CV Templates')
@Controller('cms/cv-templates')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CvTemplatesController {
  constructor(private readonly cvTemplatesService: CvTemplatesService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  create(@Body() createDto: CreateCvTemplateDto) {
    return this.cvTemplatesService.create(createDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  findAll() {
    return this.cvTemplatesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.cvTemplatesService.findOne(+id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateDto: UpdateCvTemplateDto) {
    return this.cvTemplatesService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.cvTemplatesService.remove(+id);
  }

  @Put(':id/toggle-active')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  toggleActive(@Param('id') id: string) {
    return this.cvTemplatesService.toggleActive(+id);
  }

  @Put(':id/display-order')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  updateDisplayOrder(@Param('id') id: string, @Body('displayOrder') displayOrder: number) {
    return this.cvTemplatesService.updateDisplayOrder(+id, displayOrder);
  }
}

// Public endpoint for users to view active templates
@ApiTags('CV Templates')
@Controller('cv-templates')
export class PublicCvTemplatesController {
  constructor(private readonly cvTemplatesService: CvTemplatesService) {}

  @Get()
  findActive() {
    return this.cvTemplatesService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvTemplatesService.findOne(+id);
  }
}
