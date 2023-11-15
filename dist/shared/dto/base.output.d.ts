export declare class BaseOutput {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export declare const createMultipleUnion: <T extends (new (...args: any[]) => any)[]>(...entities: T) => InstanceType<import("@nestjs/graphql").ArrayElement<readonly [...T]>>;
