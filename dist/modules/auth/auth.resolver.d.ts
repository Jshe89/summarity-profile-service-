import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { SignupUnionOutput } from './dto/signup.output';
import { LoginUnionOutput } from './dto/login.output';
import { LoginInput } from './dto/login.input';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    signup(input: SignupInput): Promise<typeof SignupUnionOutput>;
    login(input: LoginInput): Promise<typeof LoginUnionOutput>;
}
