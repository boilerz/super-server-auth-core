import { DocumentType } from '@typegoose/typegoose';
import UserInput from '../model/user/UserInput';
import User from '../model/user/User';
import UserModel, { UserSchema } from '../model/user/UserModel';
import logger from '@boilerz/logger';
import mongoose from 'mongoose'
export async function signUp(user: UserInput): Promise<User> {
  logger.info({ readyState: mongoose.connection.readyState }, 'Trying to save')

  const createdUser: DocumentType<UserSchema> = await UserModel.create(user);
  logger.info({ createdUser }, 'Created, converting ...')
  return createdUser.toObjectType(User);
}
