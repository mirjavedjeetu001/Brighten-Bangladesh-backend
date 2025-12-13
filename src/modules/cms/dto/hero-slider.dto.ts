import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, MaxLength, ValidateIf, IsArray } from 'class-validator';

export class CreateHeroSliderDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  button_text?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  button_link?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  image_url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  video_url?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  display_order?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class UpdateHeroSliderDto extends CreateHeroSliderDto {}

export class ReorderHeroSliderDto {
  @ApiProperty({ type: [Number] })
  @IsInt({ each: true })
  order: number[];

  @ApiProperty({ type: 'array', items: { type: 'object', properties: { id: { type: 'number' } } }, required: false })
  @IsOptional()
  @IsArray()
  @ValidateIf((o) => !o.order)
  orders?: { id: number; display_order?: number }[];
}
