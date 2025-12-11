import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutPage } from '../entities/about-page.entity';
import { CreateAboutPageDto, UpdateAboutPageDto } from '../dto/about-page.dto';

@Injectable()
export class AboutPageService {
  constructor(
    @InjectRepository(AboutPage)
    private aboutPageRepo: Repository<AboutPage>,
  ) {}

  /**
   * Get the about page content. Since there should only be one about page,
   * this returns the first record or creates a default one if none exists.
   */
  async getAboutPage(): Promise<AboutPage> {
    const aboutPage = await this.aboutPageRepo.findOne({ where: {} });
    
    if (!aboutPage) {
      // Create default about page if none exists
      const defaultAboutPage = this.aboutPageRepo.create({
        hero_title: 'About Brighten Bangladesh',
        hero_subtitle: 'Empowering Communities, Brightening Futures',
        mission_title: 'Our Mission',
        mission_content: 'To empower communities through sustainable development and social initiatives.',
        vision_title: 'Our Vision',
        vision_content: 'A brighter Bangladesh where every individual has the opportunity to thrive.',
        values_title: 'Our Values',
        values_content: '<ul><li>Integrity</li><li>Collaboration</li><li>Excellence</li><li>Impact</li></ul>',
        story_title: 'Our Story',
        story_content: 'Brighten Bangladesh was founded with a vision to create positive change in communities across the nation.',
        team_title: 'Our Team',
        team_subtitle: 'Meet the people making a difference',
      });
      return this.aboutPageRepo.save(defaultAboutPage);
    }
    
    return aboutPage;
  }

  /**
   * Update the about page content. If no record exists, creates one.
   */
  async updateAboutPage(dto: UpdateAboutPageDto): Promise<AboutPage> {
    let aboutPage = await this.aboutPageRepo.findOne({ where: {} });
    
    if (!aboutPage) {
      // Create new if doesn't exist
      aboutPage = this.aboutPageRepo.create(dto);
    } else {
      // Update existing
      Object.assign(aboutPage, dto);
    }
    
    return this.aboutPageRepo.save(aboutPage);
  }

  /**
   * Create or replace the about page content
   */
  async createOrReplaceAboutPage(dto: CreateAboutPageDto): Promise<AboutPage> {
    // Delete any existing about page
    await this.aboutPageRepo.delete({});
    
    // Create new one
    const aboutPage = this.aboutPageRepo.create(dto);
    return this.aboutPageRepo.save(aboutPage);
  }
}
