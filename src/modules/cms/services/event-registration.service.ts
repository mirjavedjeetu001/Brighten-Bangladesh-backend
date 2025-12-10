import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventRegistration, RegistrationStatus } from '../entities/event-registration.entity';
import { EventService } from './event.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class EventRegistrationService {
  constructor(
    @InjectRepository(EventRegistration)
    private eventRegistrationRepository: Repository<EventRegistration>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventService: EventService,
  ) {}

  async register(eventId: number, userId: number) {
    // Check if user is approved
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.isApproved) {
      throw new ForbiddenException('Only approved members can register for events');
    }
    // Check if event exists and is active
    const event = await this.eventService.findOne(eventId);
    if (!event.is_active) {
      throw new BadRequestException('This event is not accepting registrations');
    }

    // Check if event date has passed
    if (new Date(event.event_date) < new Date()) {
      throw new BadRequestException('Cannot register for past events');
    }

    // Check if user already registered
    const existing = await this.eventRegistrationRepository.findOne({
      where: { event_id: eventId, user_id: userId },
    });

    if (existing && existing.status !== RegistrationStatus.CANCELLED) {
      throw new BadRequestException('You are already registered for this event');
    }

    // Check if event is full
    if (event.max_participants) {
      const approvedCount = await this.eventRegistrationRepository.count({
        where: { event_id: eventId, status: RegistrationStatus.APPROVED },
      });

      if (approvedCount >= event.max_participants) {
        throw new BadRequestException('This event is full');
      }
    }

    // Create or update registration
    if (existing) {
      existing.status = RegistrationStatus.PENDING;
      existing.registered_at = new Date();
      return await this.eventRegistrationRepository.save(existing);
    }

    const registration = this.eventRegistrationRepository.create({
      event_id: eventId,
      user_id: userId,
      status: RegistrationStatus.PENDING,
    });

    return await this.eventRegistrationRepository.save(registration);
  }

  async cancel(eventId: number, userId: number) {
    const registration = await this.eventRegistrationRepository.findOne({
      where: { event_id: eventId, user_id: userId },
    });

    if (!registration) {
      throw new NotFoundException('Registration not found');
    }

    registration.status = RegistrationStatus.CANCELLED;
    return await this.eventRegistrationRepository.save(registration);
  }

  async getByEvent(eventId: number) {
    const registrations = await this.eventRegistrationRepository.find({
      where: { event_id: eventId },
      relations: ['user'],
      order: { registered_at: 'DESC' },
    });
    return registrations;
  }

  async getMyRegistration(eventId: number, userId: number) {
    const registration = await this.eventRegistrationRepository.findOne({
      where: { event_id: eventId, user_id: userId },
    });

    if (!registration) {
      throw new NotFoundException('Registration not found');
    }

    return registration;
  }

  async updateStatus(eventId: number, userId: number, status: RegistrationStatus, adminUser: any) {
    // Check if admin has permission
    if (!['super_admin', 'admin', 'content_manager'].includes(adminUser.role)) {
      throw new ForbiddenException('You do not have permission to manage registrations');
    }

    const registration = await this.eventRegistrationRepository.findOne({
      where: { event_id: eventId, user_id: userId },
    });

    if (!registration) {
      throw new NotFoundException('Registration not found');
    }

    // If approving, check if event is full
    if (status === RegistrationStatus.APPROVED) {
      const event = await this.eventService.findOne(eventId);
      if (event.max_participants) {
        const approvedCount = await this.eventRegistrationRepository.count({
          where: { event_id: eventId, status: RegistrationStatus.APPROVED },
        });

        if (approvedCount >= event.max_participants) {
          throw new BadRequestException('Event is full');
        }
      }
    }

    registration.status = status;
    return await this.eventRegistrationRepository.save(registration);
  }
}
