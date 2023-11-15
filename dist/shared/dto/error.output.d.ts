export declare class ErrorOutput {
    id: string;
    message: string;
    type: string;
}
export declare class ErrorListOutput {
    errors: ErrorOutput[];
}
export declare const createUnionWithError: <T extends new (...args: any[]) => any>(Entity: T) => ErrorListOutput | InstanceType<T>;
export declare const createMiltipleUnionWithError: <T extends (new (...args: any[]) => any)[]>(...entities: T) => InstanceType<import("@nestjs/graphql").ArrayElement<readonly [...T, typeof ErrorListOutput]>>;
