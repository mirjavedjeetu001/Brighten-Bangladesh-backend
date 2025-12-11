import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AboutPageService } from '../services/about-page.service';
import { UpdateAboutPageDto } from '../dto/about-page.dto';
import { AboutPage } from '../entities/about-page.entity';

@ApiTags('CMS - About Page')
@Controller('cms/about-page')
export class AboutPageController {
  constructor(private readonly aboutPageService: AboutPageService) {}

  @Get()
  @ApiOperation({ summary: 'Get about page content' })
  @ApiResponse({ status: 200, description: 'Return about page content' })
  getAboutPage(): Promise<AboutPage> {
    return this.aboutPageService.getAboutPage();
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update about page content (Admin/Content Manager)' })
  @ApiResponse({ status: 200, description: 'About page updated' })
  updateAboutPage(@Body() dto: UpdateAboutPageDto): Promise<AboutPage> {
    return this.aboutPageService.updateAboutPage(dto);
  }
}
