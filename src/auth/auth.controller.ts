import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() authDto: CreateAuthDto) {
    return this.authService.login(authDto);
  }

  @Post('/add-user')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
