import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { HeroSlider } from './entities/hero-slider.entity';
import { Page } from './entities/page.entity';
import { FocusArea } from './entities/focus-area.entity';
import { Statistic } from './entities/statistic.entity';
import { Testimonial } from './entities/testimonial.entity';
import { TeamMember } from './entities/team-member.entity';
import { Event } from './entities/event.entity';
import { Project } from './entities/project.entity';
import { Setting } from './entities/setting.entity';
import { Menu } from './entities/menu.entity';
import { ContactSubmission } from './entities/contact-submission.entity';
import { EventRegistration } from './entities/event-registration.entity';
import { AboutPage } from './entities/about-page.entity';
import { NavigationMenu } from './entities/navigation-menu.entity';
import { User } from '../users/entities/user.entity';

// Services
import { HeroSliderService } from './services/hero-slider.service';
import { NavigationMenuService } from './navigation-menu.service';
import { PageService } from './services/page.service';
import { FocusAreaService } from './services/focus-area.service';
import { StatisticService } from './services/statistic.service';
import { SettingService } from './services/setting.service';
import { ContactService } from './services/contact.service';
import { EventService } from './services/event.service';
import { ProjectService } from './services/project.service';
import { EventRegistrationService } from './services/event-registration.service';
import { AboutPageService } from './services/about-page.service';
import { TeamMemberService } from './services/team-member.service';

// Controllers
import { HeroSliderController } from './controllers/hero-slider.controller';
import { PageController } from './controllers/page.controller';
import { FocusAreaController } from './controllers/focus-area.controller';
import { StatisticController } from './controllers/statistic.controller';
import { SettingController } from './controllers/setting.controller';
import { ContactController } from './controllers/contact.controller';
import { EventController } from './controllers/event.controller';
import { ProjectController } from './controllers/project.controller';
import { AboutPageController } from './controllers/about-page.controller';
import { TeamMemberController } from './controllers/team-member.controller';
import { NavigationMenuController } from './navigation-menu.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HeroSlider,
      Page,
      FocusArea,
      Statistic,
      Testimonial,
      TeamMember,
      Event,
      Project,
      Setting,
      Menu,
      ContactSubmission,
      EventRegistration,
      NavigationMenu,
      AboutPage,
      User,
    ]),
  ],
  controllers: [
    HeroSliderController,
    PageController,
    FocusAreaController,
    StatisticController,
    SettingController,
    ContactController,
    EventController,
    ProjectController,
    AboutPageController,
    NavigationMenuController,
    TeamMemberController,
  ],
  providers: [
    HeroSliderService,
    PageService,
    FocusAreaService,
    StatisticService,
    SettingService,
    ContactService,
    EventService,
    ProjectService,
    EventRegistrationService,
    AboutPageService,
    NavigationMenuService,
    TeamMemberService,
  ],
  exports: [
    HeroSliderService,
    PageService,
    FocusAreaService,
    StatisticService,
    SettingService,
    ContactService,
    EventService,
    ProjectService,
    EventRegistrationService,
    AboutPageService,
    NavigationMenuService,
    TeamMemberService,
  ],
})
export class CmsModule {}
