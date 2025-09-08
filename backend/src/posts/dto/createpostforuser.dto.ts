import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePostForUserDto {
  @ApiProperty({ example: 'Hello world' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Body text', required: false })
  @IsOptional()
  @IsString()
  body?: string;
}