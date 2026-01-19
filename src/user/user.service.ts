import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserDocument,
  User,
  UserDocumentNoPassword,
} from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const now = new Date();

    if (createUserDto.birthDate > now) {
      throw new BadRequestException(
        'The date of birth cannot be in the future',
      );
    }

    const newUser = new this.userModel(createUserDto);
    const savedUser = await newUser.save();
    this.logger.log(`New user added: ${JSON.stringify(savedUser)}`);
    return savedUser;
  }

  findAll(): Promise<UserDocumentNoPassword[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<UserDocumentNoPassword> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUserByEmailWithPassword(email: string) {
    return this.userModel.findOne({ email }).select('+password').exec();
  }
}
