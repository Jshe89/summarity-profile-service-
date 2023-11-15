import { MyProfileOutput } from '@modules/users/dto/my-profile.output';
export declare class LoginOutput {
    accessToken: string;
    profile: MyProfileOutput;
}
export declare const LoginUnionOutput: import("@shared/dto/error.output").ErrorListOutput | LoginOutput;
