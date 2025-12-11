import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAboutPageDto {
  @ApiProperty({ description: 'Hero section title' })
  @IsString()
  hero_title: string;

  @ApiPropertyOptional({ description: 'Hero section subtitle' })
  @IsString()
  @IsOptional()
  hero_subtitle?: string;

  @ApiPropertyOptional({ description: 'Hero section background image URL' })
  @IsString()
  @IsOptional()
  hero_image?: string;

  @ApiPropertyOptional({ description: 'Mission section title' })
  @IsString()
  @IsOptional()
  mission_title?: string;

  @ApiPropertyOptional({ description: 'Mission section content (HTML supported)' })
  @IsString()
  @IsOptional()
  mission_content?: string;

  @ApiPropertyOptional({ description: 'Vision section title' })
  @IsString()
  @IsOptional()
  vision_title?: string;

  @ApiPropertyOptional({ description: 'Vision section content (HTML supported)' })
  @IsString()
  @IsOptional()
  vision_content?: string;

  @ApiPropertyOptional({ description: 'Values section title' })
  @IsString()
  @IsOptional()
  values_title?: string;

  @ApiPropertyOptional({ description: 'Values section content (HTML supported)' })
  @IsString()
  @IsOptional()
  values_content?: string;

  @ApiPropertyOptional({ description: 'Story section title' })
  @IsString()
  @IsOptional()
  story_title?: string;

  @ApiPropertyOptional({ description: 'Story section content (HTML supported)' })
  @IsString()
  @IsOptional()
  story_content?: string;

  @ApiPropertyOptional({ description: 'Team section title' })
  @IsString()
  @IsOptional()
  team_title?: string;

  @ApiPropertyOptional({ description: 'Team section subtitle' })
  @IsString()
  @IsOptional()
  team_subtitle?: string;
}

export class UpdateAboutPageDto {
  @ApiPropertyOptional({ description: 'Hero section title' })
  @IsString()
  @IsOptional()
  hero_title?: string;

  @ApiPropertyOptional({ description: 'Hero section subtitle' })
  @IsString()
  @IsOptional()
  hero_subtitle?: string;

  @ApiPropertyOptional({ description: 'Hero section background image URL' })
  @IsString()
  @IsOptional()
  hero_image?: string;

  @ApiPropertyOptional({ description: 'Mission section title' })
  @IsString()
  @IsOptional()
  mission_title?: string;

  @ApiPropertyOptional({ description: 'Mission section content (HTML supported)' })
  @IsString()
  @IsOptional()
  mission_content?: string;

  @ApiPropertyOptional({ description: 'Vision section title' })
  @IsString()
  @IsOptional()
  vision_title?: string;

  @ApiPropertyOptional({ description: 'Vision section content (HTML supported)' })
  @IsString()
  @IsOptional()
  vision_content?: string;

  @ApiPropertyOptional({ description: 'Values section title' })
  @IsString()
  @IsOptional()
  values_title?: string;

  @ApiPropertyOptional({ description: 'Values section content (HTML supported)' })
  @IsString()
  @IsOptional()
  values_content?: string;

  @ApiPropertyOptional({ description: 'Story section title' })
  @IsString()
  @IsOptional()
  story_title?: string;

  @ApiPropertyOptional({ description: 'Story section content (HTML supported)' })
  @IsString()
  @IsOptional()
  story_content?: string;

  @ApiPropertyOptional({ description: 'Team section title' })
  @IsString()
  @IsOptional()
  team_title?: string;

  @ApiPropertyOptional({ description: 'Team section subtitle' })
  @IsString()
  @IsOptional()
  team_subtitle?: string;
}
