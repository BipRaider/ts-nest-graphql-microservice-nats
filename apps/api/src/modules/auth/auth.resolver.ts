import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { ErrorUtil, SendErrorUtil } from '@common/utils';
import { AuthContract } from '@common/contracts';

import { AuthService } from './auth.service';

import { LoginUserInput, LoginUserResponse } from './dto/input/login.input';
import { Auth } from './dto/auth.model';
import { User } from '../users/dto/user.model';
import { RefreshAuthGuard } from '../../guards/refresh-auth.guard';
import { CurrentUser } from '../../decorator/user.decorator';

@Resolver(of => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //   @Mutation(() => User, { nullable: true })
  //   async signup(@Arg('data') data: SignupUserInput): Promise<User> {
  //     const userCheck: User = await new Promise(res => {
  //       this.usersService.getUserByEmail({ email: data.email }).subscribe(async data => res(data));
  //     });

  //     if (userCheck) throw new Error('Email taken');

  //     const password = await this.passwordUtils.hash({ password: data.password });

  //     const user: User = await new Promise(async res => {
  //       const user = await this.usersService.createUser({ ...data, password });
  //       user.subscribe(async data => res(data));
  //     });

  //     return user;
  //   }

  @Mutation(() => LoginUserResponse)
  async login(
    @Context() context: any,
    @Args('input') input: LoginUserInput,
  ): Promise<(AuthContract.AuthQuery.Response & { access_token: string }) | GraphQLError> {
    const { res } = context;

    const user: AuthContract.AuthQuery.Response | SendErrorUtil = await this.authService.validate(input);

    if ('status' in user) return new ErrorUtil(user.status).response(user);

    res.cookie('refresh-token', await this.authService.generateRefreshToken(user), {
      httpOnly: true,
      maxAge: 1.728e8,
    });

    const { access_token } = await this.authService.login(user);

    return { ...user, access_token };
  }

  @Mutation(() => Auth, { nullable: true })
  @UseGuards(RefreshAuthGuard)
  async refreshToken(@Context() context: any, @CurrentUser() user): Promise<User> {
    const { res } = context;

    res.cookie('refresh-token', await this.authService.generateRefreshToken(user), {
      httpOnly: true,
      maxAge: 1.728e8,
    });

    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: any): Promise<boolean> {
    const { res } = context;

    res.cookie('refresh-token', '', {
      httpOnly: true,
      maxAge: 0,
    });

    return true;
  }
}
