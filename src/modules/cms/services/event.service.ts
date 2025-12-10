import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { User, UserRole } from '../../users/entities/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  private canManageEvents(user: User): boolean {
    return [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER].includes(user.role);
  }

  async create(createEventDto: CreateEventDto, user: User): Promise<Event> {
    if (!this.canManageEvents(user)) {
      throw new ForbiddenException('You do not have permission to create events');
    }

    const event = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({
      order: { display_order: 'ASC', event_date: 'DESC' },
    });
  }

  async findAllActive(): Promise<Event[]> {
    return this.eventRepository.find({
      where: { is_active: true },
      order: { display_order: 'ASC', event_date: 'DESC' },
    });
  }

  async findFeatured(): Promise<Event[]> {
    return this.eventRepository.find({
      where: { is_active: true, is_featured: true },
      order: { event_date: 'DESC' },
      take: 3,
    });
  }

  async findUpcoming(): Promise<Event[]> {
    const now = new Date();
    return this.eventRepository
      .createQueryBuilder('event')
      .where('event.is_active = :isActive', { isActive: true })
      .andWhere('event.event_date >= :now', { now })
      .orderBy('event.event_date', 'ASC')
      .limit(6)
      .getMany();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async findBySlug(slug: string): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { slug } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto, user: User): Promise<Event> {
    if (!this.canManageEvents(user)) {
      throw new ForbiddenException('You do not have permission to update events');
    }

    const event = await this.findOne(id);
    Object.assign(event, updateEventDto);
    return this.eventRepository.save(event);
  }

  async remove(id: number, user: User): Promise<void> {
    if (!this.canManageEvents(user)) {
      throw new ForbiddenException('You do not have permission to delete events');
    }

    const event = await this.findOne(id);
    await this.eventRepository.remove(event);
  }
}
