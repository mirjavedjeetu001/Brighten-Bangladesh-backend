import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EventService } from '../services/event.service';
import { EventRegistrationService } from '../services/event-registration.service';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import { RegistrationStatus } from '../entities/event-registration.entity';

@ApiTags('Events')
@Controller('cms/events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly eventRegistrationService: EventRegistrationService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create event (Admin only)' })
  create(@Body() createEventDto: CreateEventDto, @CurrentUser() user: User) {
    return this.eventService.create(createEventDto, user);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active events' })
  findAllActive() {
    return this.eventService.findAllActive();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured events' })
  findFeatured() {
    return this.eventService.findFeatured();
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming events' })
  findUpcoming() {
    return this.eventService.findUpcoming();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get event by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.eventService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  findAll() {
    return this.eventService.findAll();
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update event (Admin only)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
    @CurrentUser() user: User,
  ) {
    return this.eventService.update(id, updateEventDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete event (Admin only)' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.eventService.remove(id, user);
  }

  // Event Registration Endpoints
  @Post(':id/register')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register for event (Approved members only)' })
  register(@Param('id', ParseIntPipe) eventId: number, @CurrentUser() user: User) {
    return this.eventRegistrationService.register(eventId, user.id);
  }

  @Delete(':id/register')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel event registration' })
  cancelRegistration(@Param('id', ParseIntPipe) eventId: number, @CurrentUser() user: User) {
    return this.eventRegistrationService.cancel(eventId, user.id);
  }

  @Get(':id/registrations')
  @ApiOperation({ summary: 'Get all registrations for an event' })
  getRegistrations(@Param('id', ParseIntPipe) eventId: number) {
    return this.eventRegistrationService.getByEvent(eventId);
  }

  @Get(':id/my-registration')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my registration status for an event' })
  getMyRegistration(@Param('id', ParseIntPipe) eventId: number, @CurrentUser() user: User) {
    return this.eventRegistrationService.getMyRegistration(eventId, user.id);
  }

  @Put(':eventId/registrations/:userId/status')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update registration status (Admin only)' })
  updateRegistrationStatus(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body('status') status: RegistrationStatus,
    @CurrentUser() user: User,
  ) {
    return this.eventRegistrationService.updateStatus(eventId, userId, status, user);
  }
}
