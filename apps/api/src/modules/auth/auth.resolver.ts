import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { ErrorUtil, SendErrorUtil } from '@common/utils';
import { AuthContract } from '@common/contracts';

import { AuthService } from './auth.service';

import { LoginUserInput, LoginUserResponse } from './dto/input/login.input';
import { Auth } from './dto/auth.model';

import { CurrentUser } from '../../decorator/user.decorator';
import { AccessAuthGuard, RefreshAuthGuard } from '../../guards';

@Resolver(of => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //   @Mutation(() => User, { nullable: true })
  //   async signup(@Arg('data') data: SignupUserInput): Promise<User> {
  //   }

  @Mutation(() => LoginUserResponse)
  async login(
    @Context() context: any,
    @Args('input') input: LoginUserInput,
  ): Promise<(AuthContract.AuthQuery.Response & { access_token: string }) | GraphQLError> {
    const user: AuthContract.AuthQuery.Response | SendErrorUtil = await this.authService.validate(input);
    if ('status' in user) return new ErrorUtil(user.status).response(user);

    const token = await this.authService.generateToken(user, context);

    return { ...user, ...token };
  }

  @Mutation(() => Auth, { nullable: true })
  @UseGuards(AccessAuthGuard)
  // @UseGuards(RefreshAuthGuard)
  async refreshToken(@Context() context: any, @CurrentUser() user): Promise<Auth> {
    const token = await this.authService.generateToken(user, context);
    return { ...user, ...token };
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: any): Promise<boolean> {
    return await this.logout(context);
  }
}
