import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('add-user')
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get('/get-users')
  findAll() {
    return this.userService.findAll();
  }

  @Get('/get-user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
