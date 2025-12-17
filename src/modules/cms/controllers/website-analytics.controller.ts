import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../users/entities/user.entity';
import { WebsiteAnalyticsService } from '../services/website-analytics.service';

@ApiTags('CMS - Website Analytics')
@Controller('cms/website-analytics')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class WebsiteAnalyticsController {
  constructor(private readonly analyticsService: WebsiteAnalyticsService) {}

  @Get('stats')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get website analytics stats' })
  getStats() {
    return this.analyticsService.getStats();
  }
}

@ApiTags('Analytics')
@Controller('analytics')
export class PublicAnalyticsController {
  constructor(private readonly analyticsService: WebsiteAnalyticsService) {}

  @Post('page-view')
  @ApiOperation({ summary: 'Track a page view' })
  trackPageView() {
    return this.analyticsService.trackPageView();
  }

  @Post('unique-visitor')
  @ApiOperation({ summary: 'Track a unique visitor' })
  trackUniqueVisitor() {
    return this.analyticsService.trackUniqueVisitor();
  }
}
