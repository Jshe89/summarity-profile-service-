import { MyProfileOutput } from '@modules/users/dto/my-profile.output';
export declare class MyBlockedUsersOutput {
    blockedUsers: MyProfileOutput[];
}
export declare const MyBlockedUsersUnionOutput: import("@shared/dto/error.output").ErrorListOutput | MyBlockedUsersOutput;
