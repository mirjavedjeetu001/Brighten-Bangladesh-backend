import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, Res, HttpStatus, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { UserCvsService } from './user-cvs.service';
import { CreateUserCvDto, UpdateUserCvDto } from './dto/user-cv.dto';

@ApiTags('User CVs')
@Controller('user-cvs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserCvsController {
  constructor(private readonly userCvsService: UserCvsService) {}

  @Post()
  @Roles(UserRole.MEMBER, UserRole.VOLUNTEER, UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  create(@Request() req, @Body() createDto: CreateUserCvDto) {
    const userId = this.resolveUserId(req);
    return this.userCvsService.create(userId, createDto);
  }

  @Get()
  @Roles(UserRole.MEMBER, UserRole.VOLUNTEER, UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  findAll(@Request() req) {
    const userId = this.resolveUserId(req);
    return this.userCvsService.findAll(userId);
  }

  @Get(':id')
  @Roles(UserRole.MEMBER, UserRole.VOLUNTEER, UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  findOne(@Request() req, @Param('id') id: string) {
    const userId = this.resolveUserId(req);
    return this.userCvsService.findOne(+id, userId);
  }

  @Put(':id')
  @Roles(UserRole.MEMBER, UserRole.VOLUNTEER, UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  async update(@Request() req, @Param('id') id: string, @Body() updateDto: UpdateUserCvDto) {
    const userId = this.resolveUserId(req);
    try {
      return await this.userCvsService.update(+id, userId, updateDto);
    } catch (error) {
      console.error('Error updating CV:', error);
      throw error;
    }
  }

  @Delete(':id')
  @Roles(UserRole.MEMBER, UserRole.VOLUNTEER, UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  remove(@Request() req, @Param('id') id: string) {
    const userId = this.resolveUserId(req);
    return this.userCvsService.remove(+id, userId);
  }

  @Get(':id/download/pdf')
  @Roles(UserRole.MEMBER, UserRole.VOLUNTEER, UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  async downloadPdf(@Request() req, @Param('id') id: string, @Res() res: Response) {
    const userId = this.resolveUserId(req);
    const pdfBuffer = await this.userCvsService.downloadPdf(+id, userId);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="cv-${id}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    
    res.status(HttpStatus.OK).send(pdfBuffer);
  }

  @Get(':id/download/html')
  @Roles(UserRole.MEMBER, UserRole.VOLUNTEER, UserRole.EDITOR, UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  async downloadHtml(@Request() req, @Param('id') id: string, @Res() res: Response) {
    const userId = this.resolveUserId(req);
    const cv = await this.userCvsService.findOne(+id, userId);
    
    // Track download
    await this.userCvsService.incrementDownloadCount(+id);
    
    res.set({
      'Content-Type': 'text/html',
      'Content-Disposition': `attachment; filename="cv-${id}.html"`,
      'Content-Length': Buffer.byteLength(cv.htmlContent),
    });
    
    res.status(HttpStatus.OK).send(cv.htmlContent);
  }

  private resolveUserId(req: any): number {
    const userId = Number(req.user?.id ?? req.user?.userId ?? req.user?.sub);
    if (!userId) {
      throw new BadRequestException('Authenticated user context is missing');
    }
    return userId;
  }
}

// CMS Controller for admin management
@ApiTags('CMS - User CVs')
@Controller('cms/user-cvs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CmsUserCvsController {
  constructor(private readonly userCvsService: UserCvsService) {}

  @Get('analytics')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  getAnalytics() {
    return this.userCvsService.getAnalytics();
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  findAll() {
    return this.userCvsService.findAllAdmin();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.userCvsService.findOneAdmin(+id);
  }

  @Get(':id/download/html')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  async downloadHtml(@Param('id') id: string, @Res() res: Response) {
    const cv = await this.userCvsService.findOneAdmin(+id);
    
    res.set({
      'Content-Type': 'text/html',
      'Content-Disposition': `attachment; filename="cv-${id}.html"`,
      'Content-Length': Buffer.byteLength(cv.htmlContent),
    });
    
    res.status(HttpStatus.OK).send(cv.htmlContent);
  }
}
