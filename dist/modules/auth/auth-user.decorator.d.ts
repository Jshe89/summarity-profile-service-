export interface IAuthUser {
    id: string;
    email: string;
}
export declare const AuthUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
