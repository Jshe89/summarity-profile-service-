import { ProfileOutput } from '@modules/users/dto/profile.output';
export declare class ProfileContactsOutput {
    contacts: ProfileOutput[];
}
export declare const ProfileContactsUnionOutput: import("@shared/dto/error.output").ErrorListOutput | ProfileContactsOutput;
