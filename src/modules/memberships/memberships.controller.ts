import { Controller, Get, Post, UseGuards, Param, ParseIntPipe, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MembershipsService } from './memberships.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { User, UserRole } from '../users/entities/user.entity';

@ApiTags('Memberships')
@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user membership status' })
  @ApiResponse({ status: 200, description: 'Membership status retrieved' })
  getMyMembership(@CurrentUser() user: User) {
    return this.membershipsService.getUserMembership(user.id);
  }

  @Post('check')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check membership eligibility for current user' })
  @ApiResponse({ status: 200, description: 'Eligibility check completed' })
  checkEligibility(@CurrentUser() user: User) {
    return this.membershipsService.checkEligibility(user.id);
  }

  @Post('apply')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Apply for membership (creates if eligible)' })
  @ApiResponse({ status: 201, description: 'Membership created successfully' })
  @ApiResponse({ status: 400, description: 'Not eligible for membership' })
  async applyForMembership(@CurrentUser() user: User) {
    return this.membershipsService.createOrUpdateMembership(user.id);
  }

  @Get('activities/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user activities' })
  @ApiResponse({ status: 200, description: 'Activities retrieved' })
  getMyActivities(@CurrentUser() user: User) {
    return this.membershipsService.getUserActivities(user.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all memberships (Admin only)' })
  @ApiResponse({ status: 200, description: 'All memberships retrieved' })
  getAllMemberships() {
    return this.membershipsService.getAllMemberships();
  }

  @Post('user/:userId/check')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check eligibility for specific user (Admin only)' })
  @ApiResponse({ status: 200, description: 'Eligibility check completed' })
  checkUserEligibility(@Param('userId', ParseIntPipe) userId: number) {
    return this.membershipsService.checkEligibility(userId);
  }

  @Post('activities')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user activity (Admin only)' })
  @ApiResponse({ status: 201, description: 'Activity created' })
  createActivity(
    @Body() body: { userId: number; type: string; meta: any },
  ) {
    return this.membershipsService.createActivity(body.userId, body.type, body.meta);
  }
}
