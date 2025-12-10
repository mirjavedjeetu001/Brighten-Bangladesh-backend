import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'Comment content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Author name (for guests)', required: false })
  @IsString()
  @IsOptional()
  author_name?: string;

  @ApiProperty({ description: 'Author email (for guests)', required: false })
  @IsEmail()
  @IsOptional()
  author_email?: string;
}
