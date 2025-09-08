import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Yeni İsim' })
  @IsOptional() @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'yeniusername' })
  @IsOptional() @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'yeni@mail.com' })
  @IsOptional() @IsEmail()
  email?: string;
}
