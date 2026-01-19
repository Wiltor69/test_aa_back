import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: CreateAuthDto) {
    const user = await this.validateUser(authDto);
    return this.generateToken(user);
  }
  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { email: user.email, birthDate: user.birthDate };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(authDto: CreateAuthDto) {
    const user = await this.userService.getUserByEmailWithPassword(
      authDto.email,
    );
    if (!user) {
      throw new UnauthorizedException({
        message: 'Incorrect email or password',
      });
    }

    const passwordEquals = await bcrypt.compare(
      authDto.password,
      user.password,
    );

    if (passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }
}
