import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserCv } from './entities/user-cv.entity';
import { CreateUserCvDto, UpdateUserCvDto } from './dto/user-cv.dto';
import { CvTemplatesService } from '../cv-templates/cv-templates.service';
import { CvRenderService } from './cv-render.service';

@Injectable()
export class UserCvsService {
  constructor(
    @InjectRepository(UserCv)
    private userCvsRepository: Repository<UserCv>,
    private cvTemplatesService: CvTemplatesService,
    private cvRenderService: CvRenderService,
    private configService: ConfigService,
  ) {}

  async create(userId: number, createDto: CreateUserCvDto): Promise<UserCv> {
    // Verify template exists and is active
    const template = await this.cvTemplatesService.findOne(createDto.templateId);
    if (!template.isActive) {
      throw new BadRequestException('Selected template is not active');
    }

    const cv = this.userCvsRepository.create({
      ...createDto,
      userId,
    });

    const saved = await this.userCvsRepository.save(cv);
    
    // Generate HTML content
    try {
      await this.regenerateHtml(saved.id);
    } catch (error) {
      console.error('Error generating HTML content for CV:', error);
      // Don't fail the whole operation, just log it
      // CV is saved but htmlContent will be empty
    }
    
    return this.findOne(saved.id, userId);
  }

  async findAll(userId: number): Promise<UserCv[]> {
    return await this.userCvsRepository.find({
      where: { userId },
      relations: ['template'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<UserCv> {
    const cv = await this.userCvsRepository.findOne({
      where: { id },
      relations: ['template'],
    });
    
    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }
    
    if (Number(cv.userId) !== Number(userId)) {
      throw new ForbiddenException('You do not have permission to access this CV');
    }
    
    return cv;
  }

  async update(id: number, userId: number, updateDto: UpdateUserCvDto): Promise<UserCv> {
    const cv = await this.findOne(id, userId);
    
    if (updateDto.templateId && updateDto.templateId !== cv.templateId) {
      const template = await this.cvTemplatesService.findOne(updateDto.templateId);
      if (!template.isActive) {
        throw new BadRequestException('Selected template is not active');
      }
    }
    
    Object.assign(cv, updateDto);
    await this.userCvsRepository.save(cv);
    
    // Regenerate HTML content
    try {
      await this.regenerateHtml(id);
    } catch (error) {
      console.error('Error regenerating HTML in update:', error);
      // Throw the error so user can see it
      throw new BadRequestException(`Failed to generate CV preview: ${error.message}`);
    }
    
    return this.findOne(id, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    const cv = await this.findOne(id, userId);
    await this.userCvsRepository.remove(cv);
  }

  async regenerateHtml(cvId: number): Promise<void> {
    const cv = await this.userCvsRepository.findOne({
      where: { id: cvId },
      relations: ['template'],
    });
    
    if (!cv) {
      throw new NotFoundException(`CV with ID ${cvId} not found`);
    }

    if (!cv.template) {
      console.error(`CV ${cvId} has no template attached`);
      throw new BadRequestException('CV template not found');
    }

    if (!cv.template.htmlContent) {
      console.error(`Template ${cv.template.id} has no HTML content`);
      throw new BadRequestException('Template HTML content is missing');
    }

    const personalInfo = cv.personalInfo || {};
    const baseUrl = this.configService.get('app.url') || this.configService.get('APP_URL') || this.configService.get('BASE_URL') || 'http://localhost:3000';
    const normalizePhoto = (p?: string) => {
      if (!p) return '';

      const trimmed = p.trim();
      const stripApiPrefix = (value: string) =>
        value.includes('/api/uploads/') ? value.replace('/api/uploads/', '/uploads/') : value;

      const isAbsolute = /^https?:\/\//i.test(trimmed) || trimmed.startsWith('data:') || trimmed.startsWith('blob:');
      if (isAbsolute) {
        return stripApiPrefix(trimmed);
      }

      // Ensure leading slash for relative paths
      let path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
      path = stripApiPrefix(path);

      return `${baseUrl}${path}`;
    };
    const photo = normalizePhoto(personalInfo.photo);

    const experience = (cv.experience || []).map((exp) => ({
      ...exp,
      period: [exp.startDate, exp.endDate].filter(Boolean).join(' - ').trim(),
    }));

    const education = (cv.education || []).map((edu) => ({
      ...edu,
      year: edu.graduationDate,
    }));

    const languages = (cv.languages || []).map((lang) => ({
      name: lang.language,
      level: lang.proficiency,
    }));

    const additional = cv.additionalSections || {};
    const sectionTitles = additional.sectionTitles || {};

    // Provide both nested and top-level personal info fields to support templates
    const cvData = {
      personalInfo,
      name: personalInfo.name,
      title: personalInfo.title,
      email: personalInfo.email,
      phone: personalInfo.phone,
      location: personalInfo.location,
      photo,
      linkedin: (personalInfo as any).linkedin,
      github: (personalInfo as any).github,
      website: (personalInfo as any).website,
      summary: personalInfo.summary,
      experience,
      education,
      skills: cv.skills || [],
      languages,
      certifications: additional.certifications || [],
      projects: additional.projects || [],
      activities: additional.activities || [],
      references: additional.references || [],
      portfolio: additional.portfolio || [],
      personalSkills: additional.personalSkills || [],
      themeColor: additional.themeColor || '#0f766e',
      sectionTitles,
    };

    const html = this.cvRenderService.renderCvHtml(
      cv.template.htmlContent,
      cv.template.cssContent || '',
      cvData,
    );

    if (!html || html.trim().length === 0) {
      console.error('Generated HTML is empty for CV:', cvId);
      throw new Error('Generated HTML content is empty');
    }

    cv.htmlContent = html;
    await this.userCvsRepository.save(cv);
    console.log(`Successfully generated HTML for CV ${cvId}, length: ${html.length}`);
  }

  async downloadPdf(id: number, userId: number): Promise<Buffer> {
    const cv = await this.findOne(id, userId);
    
    if (!cv.htmlContent) {
      await this.regenerateHtml(id);
      const updated = await this.findOne(id, userId);
      return await this.cvRenderService.generatePdf(updated.htmlContent);
    }
    
    return await this.cvRenderService.generatePdf(cv.htmlContent);
  }

  async downloadDocx(id: number, userId: number): Promise<Buffer> {
    const cv = await this.findOne(id, userId);
    
    if (!cv.htmlContent) {
      await this.regenerateHtml(id);
      const updated = await this.findOne(id, userId);
      return await this.cvRenderService.generateDocx(updated.htmlContent);
    }
    
    return await this.cvRenderService.generateDocx(cv.htmlContent);
  }

  // Admin methods
  async findAllAdmin(): Promise<UserCv[]> {
    return await this.userCvsRepository.find({
      relations: ['user', 'template'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneAdmin(id: number): Promise<UserCv> {
    const cv = await this.userCvsRepository.findOne({
      where: { id },
      relations: ['user', 'template'],
    });
    
    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }
    
    return cv;
  }

  async incrementDownloadCount(id: number): Promise<void> {
    await this.userCvsRepository.increment({ id }, 'downloadCount', 1);
  }

  async getAnalytics(): Promise<{
    totalCvs: number;
    totalDownloads: number;
    cvsByUser: Array<{ userId: number; userName: string; cvCount: number; totalDownloads: number }>;
    recentCvs: Array<{ id: number; title: string; userName: string; downloads: number; createdAt: Date }>;
  }> {
    // Get total CVs
    const totalCvs = await this.userCvsRepository.count();

    // Get total downloads
    const downloadResult = await this.userCvsRepository
      .createQueryBuilder('cv')
      .select('SUM(cv.downloadCount)', 'total')
      .getRawOne();
    const totalDownloads = parseInt(downloadResult?.total || '0');

    // Get CVs by user
    const cvsByUser = await this.userCvsRepository
      .createQueryBuilder('cv')
      .leftJoin('cv.user', 'user')
      .select('user.id', 'userId')
      .addSelect('user.name', 'userName')
      .addSelect('COUNT(cv.id)', 'cvCount')
      .addSelect('SUM(cv.downloadCount)', 'totalDownloads')
      .groupBy('user.id')
      .orderBy('cvCount', 'DESC')
      .getRawMany();

    // Get recent CVs
    const recentCvs = await this.userCvsRepository
      .createQueryBuilder('cv')
      .leftJoin('cv.user', 'user')
      .select(['cv.id', 'cv.title', 'cv.downloadCount', 'cv.createdAt', 'user.name'])
      .orderBy('cv.createdAt', 'DESC')
      .limit(10)
      .getMany();

    return {
      totalCvs,
      totalDownloads,
      cvsByUser: cvsByUser.map(u => ({
        userId: u.userId,
        userName: u.userName,
        cvCount: parseInt(u.cvCount),
        totalDownloads: parseInt(u.totalDownloads || '0'),
      })),
      recentCvs: recentCvs.map(cv => ({
        id: cv.id,
        title: cv.title,
        userName: cv.user?.name || 'Unknown',
        downloads: cv.downloadCount,
        createdAt: cv.createdAt,
      })),
    };
  }
}
