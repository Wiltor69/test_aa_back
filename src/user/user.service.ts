import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const now = new Date();
    const mailUser = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (createUserDto.birthDate > now) {
      throw new BadRequestException(
        'The date of birth cannot be in the future',
      );
    }
    if (mailUser) {
      this.logger.warn(
        `User with this email already exists: ${createUserDto.email}`,
      );
      throw new ConflictException('User with this email already exists');
    }
    const newUser = new this.userModel(createUserDto);
    const savedUser = await newUser.save();
    this.logger.log(`New user added: ${JSON.stringify(savedUser)}`);
    return savedUser;
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
