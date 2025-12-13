import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, IsDateString, MaxLength, IsEnum } from 'class-validator';
import { EventStatus } from '../entities/event.entity';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  short_description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  full_description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty()
  @IsDateString()
  event_date: Date;

  @ApiPropertyOptional({ description: 'When registrations open' })
  @IsOptional()
  @IsDateString()
  registration_start?: Date;

  @ApiPropertyOptional({ description: 'Optional cutoff date/time for registrations' })
  @IsOptional()
  @IsDateString()
  registration_deadline?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  organizer?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  max_participants?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  registration_link?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  is_featured?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  display_order?: number;

  @ApiPropertyOptional({ enum: EventStatus, default: EventStatus.UPCOMING })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}

export class UpdateEventDto extends CreateEventDto {}
