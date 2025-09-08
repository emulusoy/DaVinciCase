import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Mustafa Ulusoy' })
  @IsString() name!: string;

  @ApiProperty({ example: 'eMu' })
  @IsString() username!: string;

  @ApiProperty({ example: 'mail@example.com' })
  @IsEmail() email!: string;
}
