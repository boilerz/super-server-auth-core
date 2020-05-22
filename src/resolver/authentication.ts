import { Arg, Mutation, Resolver } from 'type-graphql';
import User from '../model/user/User';
import UserInput from '../model/user/UserInput';
import * as authenticationService from '../service/authentication';
import logger from '@boilerz/logger'

@Resolver(User)
class AuthenticationResolver {
  @Mutation(() => User, { nullable: true })
  async signUp(@Arg('userInput') userInput: UserInput): Promise<User> {
    logger.info({ userInput }, 'Doing ...')
    const user = await authenticationService.signUp(userInput);
    logger.info({ user }, 'Done')
    return user;
  }
}

export default AuthenticationResolver;
