export class CreateAuthDto {
  @ApiProperty({
    description: 'This is email',
    example: 'info@mail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
