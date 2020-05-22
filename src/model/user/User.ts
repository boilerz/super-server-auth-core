import negate from 'lodash/negate';
import isEmpty from 'lodash/isEmpty';
import { ObjectType, Field } from 'type-graphql';
import { prop } from '@typegoose/typegoose';

import Entity from '../Entity';
import Role from '../../enum/Role';

async function validateEmailInUse(email: string): Promise<boolean> {
  // @ts-ignore FIXME
  return (await this.constructor.countDocuments({ email })) === 0;
}

@ObjectType()
export default class User extends Entity {
  @Field()
  @prop({ required: true })
  firstName: string;

  @Field()
  @prop({ required: true })
  lastName: string;

  @Field()
  @prop({
    required: true,
    unique: true,
    validate: [
      { validator: negate(isEmpty), message: 'user:validator:emailBlank' },
      { validator: validateEmailInUse, message: 'user:validator.emailInUse' },
    ],
    lowercase: true,
  })
  email: string;

  @Field(() => [String])
  @prop({
    required: true,
    items: String,
    enum: Role,
    default: [Role.USER],
  })
  roles: string[];

  @Field(() => Date)
  @prop({
    default: Date.now,
  })
  createdAt: Date;
}
