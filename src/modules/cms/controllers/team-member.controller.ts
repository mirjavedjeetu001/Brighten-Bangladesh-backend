import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TeamMemberService } from '../services/team-member.service';
import { CreateTeamMemberDto, UpdateTeamMemberDto, ReorderTeamMembersDto } from '../dto/team-member.dto';
import { TeamMember } from '../entities/team-member.entity';

@ApiTags('CMS - Team Members')
@Controller('cms/team-members')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Get()
  @ApiOperation({ summary: 'Get all team members' })
  @ApiResponse({ status: 200, description: 'Return all team members' })
  findAll(): Promise<TeamMember[]> {
    return this.teamMemberService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active team members' })
  @ApiResponse({ status: 200, description: 'Return active team members' })
  findAllActive(): Promise<TeamMember[]> {
    return this.teamMemberService.findAllActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get team member by ID' })
  @ApiResponse({ status: 200, description: 'Return team member' })
  @ApiResponse({ status: 404, description: 'Team member not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TeamMember> {
    return this.teamMemberService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add team member from approved users (Admin only)' })
  @ApiResponse({ status: 201, description: 'Team member added' })
  @ApiResponse({ status: 400, description: 'User not found or already a team member' })
  create(@Body() dto: CreateTeamMemberDto): Promise<TeamMember> {
    return this.teamMemberService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update team member' })
  @ApiResponse({ status: 200, description: 'Team member updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTeamMemberDto,
  ): Promise<TeamMember> {
    return this.teamMemberService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove team member' })
  @ApiResponse({ status: 200, description: 'Team member removed' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.teamMemberService.remove(id);
  }

  @Patch(':id/toggle-active')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle team member active status' })
  @ApiResponse({ status: 200, description: 'Status toggled' })
  toggleActive(@Param('id', ParseIntPipe) id: number): Promise<TeamMember> {
    return this.teamMemberService.toggleActive(id);
  }

  @Patch('reorder')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reorder team members' })
  @ApiResponse({ status: 200, description: 'Team members reordered' })
  reorder(@Body() dto: ReorderTeamMembersDto): Promise<void> {
    return this.teamMemberService.reorder(dto.order);
  }
}
