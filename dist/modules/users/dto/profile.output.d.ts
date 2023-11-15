import { BaseOutput } from '@shared/dto/base.output';
export declare class ProfileOutput extends BaseOutput {
    firstName: string;
    lastName: string;
    title?: string;
}
export declare const ProfileUnionOutput: import("@shared/dto/error.output").ErrorListOutput | ProfileOutput;
