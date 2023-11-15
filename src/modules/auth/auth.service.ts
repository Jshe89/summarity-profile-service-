
import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IConfig } from '@config/configuration.types';
import { UserRepository } from '@modules/users/user.repository';
import { User } from '@modules/users/user.entity';
import { UserAlreadyExistsError } from '@modules/users/user.errors';
import { AuthWrongCredentialsError } from './auth.errors';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { LoginOutput } from './dto/login.output';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService<IConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(input: SignupInput) {
    const { email } = input;
    const userWithEmail = await this.userRepository.findByEmail(email);
    if (userWithEmail) {
      throw new UserAlreadyExistsError({ email });
    }
    const user = await this.userRepository.createAndSave(input);
    return this.getAuthPayload(user);
  }

  async login(input: LoginInput): Promise<LoginOutput> {
    const user: User | undefined = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new AuthWrongCredentialsError();
    }
    const isPasswordCorrect = await compare(input.password, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new AuthWrongCredentialsError();
    }
    return this.getAuthPayload(user);
  }

  private getAuthPayload(user: User) {
    const accessToken = this.jwtService.sign(
      { id: user.id, email: user.email },
      this.configService.get('app.jwtAuth', { infer: true })
    );
    return {
      accessToken,
      profile: user
    };
  }
}
