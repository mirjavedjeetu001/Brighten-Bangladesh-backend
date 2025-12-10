import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactSubmission, SubmissionStatus } from '../entities/contact-submission.entity';
import { CreateContactSubmissionDto } from '../dto/contact-submission.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactSubmission)
    private contactRepo: Repository<ContactSubmission>,
  ) {}

  async create(
    dto: CreateContactSubmissionDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<ContactSubmission> {
    const submission = this.contactRepo.create({
      ...dto,
      ip_address: ipAddress,
      user_agent: userAgent,
    });
    return this.contactRepo.save(submission);
  }

  async findAll(status?: SubmissionStatus): Promise<ContactSubmission[]> {
    const where = status ? { status } : {};
    return this.contactRepo.find({
      where,
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ContactSubmission> {
    const submission = await this.contactRepo.findOne({ where: { id } });
    if (!submission) {
      throw new NotFoundException(`Contact submission with ID ${id} not found`);
    }
    return submission;
  }

  async updateStatus(id: number, status: SubmissionStatus): Promise<ContactSubmission> {
    await this.findOne(id);
    await this.contactRepo.update(id, { status });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.contactRepo.delete(id);
  }

  async getUnreadCount(): Promise<number> {
    return this.contactRepo.count({
      where: { status: SubmissionStatus.NEW },
    });
  }
}
