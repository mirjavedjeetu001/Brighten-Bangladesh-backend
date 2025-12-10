import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, MaxLength } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  menu_location: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  label: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  parent_id?: number;

  @ApiPropertyOptional({ default: '_self' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  target?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  icon?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  display_order?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class UpdateMenuDto extends CreateMenuDto {}

export class ReorderMenuDto {
  @ApiProperty({ type: [Number] })
  @IsInt({ each: true })
  order: number[];
}
