import { BaseOutput } from '@shared/dto/base.output';
export declare class MyProfileOutput extends BaseOutput {
    email: string;
    firstName: string;
    lastName: string;
    title?: string;
}
export declare const MyProfileUnionOutput: import("@shared/dto/error.output").ErrorListOutput | MyProfileOutput;
