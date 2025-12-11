import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from '../entities/team-member.entity';
import { User } from '../../users/entities/user.entity';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from '../dto/team-member.dto';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectRepository(TeamMember)
    private teamMemberRepo: Repository<TeamMember>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<TeamMember[]> {
    return this.teamMemberRepo.find({
      relations: ['user'],
      order: { display_order: 'ASC', created_at: 'DESC' },
    });
  }

  async findAllActive(): Promise<TeamMember[]> {
    return this.teamMemberRepo.find({
      where: { is_active: true },
      relations: ['user'],
      order: { display_order: 'ASC' },
    });
  }

  async findOne(id: number): Promise<TeamMember> {
    const member = await this.teamMemberRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    
    if (!member) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }
    
    return member;
  }

  async create(dto: CreateTeamMemberDto): Promise<TeamMember> {
    // Check if user exists and is approved
    const user = await this.userRepo.findOne({
      where: { id: dto.user_id, isApproved: true },
    });
    
    if (!user) {
      throw new BadRequestException('User not found or not approved');
    }

    // Check if user is already a team member
    const existingMember = await this.teamMemberRepo.findOne({
      where: { user_id: dto.user_id },
    });
    
    if (existingMember) {
      throw new BadRequestException('This user is already a team member');
    }

    const member = this.teamMemberRepo.create(dto);
    return this.teamMemberRepo.save(member);
  }

  async update(id: number, dto: UpdateTeamMemberDto): Promise<TeamMember> {
    await this.findOne(id);
    await this.teamMemberRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.teamMemberRepo.delete(id);
  }

  async reorder(ids: number[]): Promise<void> {
    for (let i = 0; i < ids.length; i++) {
      await this.teamMemberRepo.update(ids[i], { display_order: i });
    }
  }

  async toggleActive(id: number): Promise<TeamMember> {
    const member = await this.findOne(id);
    member.is_active = !member.is_active;
    return this.teamMemberRepo.save(member);
  }
}
