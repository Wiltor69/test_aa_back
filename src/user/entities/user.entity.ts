import { Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export type UserDocumentNoPassword = Omit<UserDocument, 'password'>;

@Schema()
export class User {}
