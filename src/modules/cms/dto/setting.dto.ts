import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateSettingDto {
  @ApiProperty()
  @IsString()
  @MaxLength(191)
  setting_key: string;

  @ApiProperty()
  @IsString()
  setting_value: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  setting_type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}

export class BulkUpdateSettingsDto {
  @ApiProperty({ type: [UpdateSettingDto] })
  settings: UpdateSettingDto[];
}
