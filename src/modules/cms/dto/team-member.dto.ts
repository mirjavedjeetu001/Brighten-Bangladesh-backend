import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, IsObject, MaxLength, IsNumber } from 'class-validator';

export class CreateTeamMemberDto {
  @ApiProperty({ description: 'User ID from approved users' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'Role/position in the organization', example: 'Founder' })
  @IsString()
  @MaxLength(255)
  role: string;

  @ApiPropertyOptional({ description: 'Category/department', example: 'Leadership' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  category?: string;

  @ApiPropertyOptional({ description: 'Description of contributions' })
  @IsOptional()
  @IsString()
  contributions?: string;

  @ApiPropertyOptional({ description: 'Social media links' })
  @IsOptional()
  @IsObject()
  social_links?: Record<string, string>;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  display_order?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class UpdateTeamMemberDto {
  @ApiPropertyOptional({ description: 'Role/position in the organization' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  role?: string;

  @ApiPropertyOptional({ description: 'Category/department' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  category?: string;

  @ApiPropertyOptional({ description: 'Description of contributions' })
  @IsOptional()
  @IsString()
  contributions?: string;

  @ApiPropertyOptional({ description: 'Social media links' })
  @IsOptional()
  @IsObject()
  social_links?: Record<string, string>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  display_order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class ReorderTeamMembersDto {
  @ApiProperty({ type: [Number], description: 'Array of team member IDs in desired order' })
  order: number[];
}
