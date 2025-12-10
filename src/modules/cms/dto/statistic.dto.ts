import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, MaxLength } from 'class-validator';

export class CreateStatisticDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  label: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  value: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  icon?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  suffix?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  display_order?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class UpdateStatisticDto extends CreateStatisticDto {}

export class BulkUpdateStatisticsDto {
  @ApiProperty({ type: [UpdateStatisticDto] })
  statistics: UpdateStatisticDto[];
}
