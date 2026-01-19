import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export type UserDocumentNoPassword = Omit<UserDocument, 'password'>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @ApiProperty({
    description: 'This is users name',
    example: 'John',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'This is email',
    example: 'info@mail.com',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'This is password',
    example: '123$567Q',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    description: 'This is phonenumber',
    example: '+380675553322',
  })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({
    description: 'This is data of birthday',
    example: '2023-04-01',
  })
  @Prop({ type: Date, required: true })
  birthDate: Date;

  @ApiProperty({
    description: 'Creation date (automatically generated)',
    example: '2023-04-01T00:00:00.000Z',
    readOnly: true,
  })
  @Prop()
  createdAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
