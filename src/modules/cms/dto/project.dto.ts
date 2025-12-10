import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsEnum, IsDateString, IsNumber, MaxLength, IsInt } from 'class-validator';

export class CreateProjectDto {
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ enum: ['planning', 'ongoing', 'completed'], default: 'ongoing' })
  @IsOptional()
  @IsEnum(['planning', 'ongoing', 'completed'])
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  start_date?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  end_date?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  beneficiaries?: number;

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
}

export class UpdateProjectDto extends CreateProjectDto {}
