import { MyProfileOutput } from '@modules/users/dto/my-profile.output';
export declare class SignupOutput {
    accessToken: string;
    profile: MyProfileOutput;
}
export declare const SignupUnionOutput: import("@shared/dto/error.output").ErrorListOutput | SignupOutput;
