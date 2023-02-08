import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Context, Query } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { ErrorUtil, SendErrorUtil } from '@common/utils';
import { AuthContract } from '@common/contracts';
import { IJwtGenerateToken } from '@common/interface';

import { AuthService } from './auth.service';

import { Auth } from './dto/auth.model';
import {
  LoginUserInput,
  LoginUserResponse,
  RefreshTokenResponse,
  SocialAuthInput,
} from './dto/input';

import { CurrentUser } from '../../decorator';
import { RefreshAuthGuard } from '../../guards';

@Resolver(of => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginUserResponse)
  async login(
    @Context() context: any,
    @Args('input') input: LoginUserInput,
  ): Promise<(AuthContract.AuthQuery.Response & { access_token: string }) | GraphQLError> {
    const user: AuthContract.AuthQuery.Response | SendErrorUtil = await this.authService.validate(
      input,
    );
    if ('status' in user) return new ErrorUtil(user.status).response(user);

    const token = await this.authService.generateToken(user, context);

    return { ...user, ...token };
  }

  @Mutation(() => RefreshTokenResponse, { nullable: true })
  @UseGuards(RefreshAuthGuard)
  async refreshToken(
    @Context() context: any,
    @CurrentUser() user: IJwtGenerateToken,
  ): Promise<IJwtGenerateToken & { access_token: string }> {
    const token = await this.authService.generateToken(user, context);
    return { ...user, ...token };
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: any): Promise<boolean> {
    const t = await this.authService.logout(context);

    return t;
  }

  //Query
  @Query(() => String)
  async gitHubAuth(@Args('input') input: SocialAuthInput, @Context() context) {
    return this.authService.githubAuth(input, context);
  }

  @Query(() => String)
  async redditAuth(@Args('input') input: SocialAuthInput, @Context() context) {
    return this.authService.redditAuth(input, context);
  }

  @Query(() => String)
  async googleAuth(@Args('input') input: SocialAuthInput, @Context() context) {
    return this.authService.googleAuth(input, context);
  }

  @Query(() => String)
  async getGoogleAuthURL() {
    return this.authService.getGoogleAuthURL();
  }
}
