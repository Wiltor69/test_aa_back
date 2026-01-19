import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'This is users name',
    example: 'John',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'This is email',
    example: 'info@mail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'This is password',
    example: '123$567Q',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;

  @ApiProperty({
    description: 'This is phonenumber',
    example: '+380675553322',
    required: true,
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: 'This is data of birthday',
    example: '2023-04-01',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;
}
