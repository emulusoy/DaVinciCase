import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePostDto {
  @ApiPropertyOptional({ example: 1 }) @IsOptional() @IsInt() @Min(1) userId?: number;
  @ApiPropertyOptional({ example: 'New title' }) @IsOptional() @IsString() title?: string;
  @ApiPropertyOptional({ example: 'New body' }) @IsOptional() @IsString() body?: string;
}
