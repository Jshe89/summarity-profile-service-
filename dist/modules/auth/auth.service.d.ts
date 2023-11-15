import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IConfig } from '@config/configuration.types';
import { UserRepository } from '@modules/users/user.repository';
import { User } from '@modules/users/user.entity';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { LoginOutput } from './dto/login.output';
export declare class AuthService {
    private readonly userRepository;
    private readonly configService;
    private readonly jwtService;
    constructor(userRepository: UserRepository, configService: ConfigService<IConfig>, jwtService: JwtService);
    signup(input: SignupInput): Promise<{
        accessToken: string;
        profile: User;
    }>;
    login(input: LoginInput): Promise<LoginOutput>;
    private getAuthPayload;
}
