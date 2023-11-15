import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { SignupUnionOutput } from './dto/signup.output';
import { LoginUnionOutput } from './dto/login.output';
import { LoginInput } from './dto/login.input';

@UseInterceptors(ErrorInterceptor)
@Resolver(() => SignupUnionOutput)
export class AuthResolver {
  constructor(
    private authService: AuthService
  ) {
  }

  @Mutation(() => SignupUnionOutput)
  signup(@Args('input') input: SignupInput): Promise<typeof SignupUnionOutput> {
    return this.authService.signup(input);
  }

  @Mutation(() => LoginUnionOutput)
  login(@Args('input') input: LoginInput): Promise<typeof LoginUnionOutput> {
    return this.authService.login(input);
  }
}
