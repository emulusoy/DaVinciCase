import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) userId!: number;
  @ApiProperty({ example: 'Hello world' }) @IsString() title!: string;
  @ApiProperty({ example: 'Body text', required: false })
  @IsOptional() @IsString() body?: string;
}
