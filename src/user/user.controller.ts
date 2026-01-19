import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get a list of all users with filtering' })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Number of page',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Number of elements per page',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search by name, email, or phone number',
  })
  @ApiQuery({
    name: 'birthDate',
    required: false,
    example: '2023-04-01',
    description: 'Seach by birthday',
  })
  @ApiResponse({
    status: 200,
    description: 'The user list has been successfully retrieved.',
  })
  @Get('/get-users')
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
    @Query('birthDate') birthDate?: string,
  ) {
    return this.userService.findAll({
      page: Number(page),
      limit: Number(limit),
      search,
      birthDate,
    });
  }

  @Get('/get-user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
