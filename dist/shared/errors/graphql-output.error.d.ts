import { BaseError } from './base.error';
export declare class GraphqlOutputError<T extends string = string, V = string> extends BaseError<T, V> {
    graphqlError: boolean;
    constructor(message: T, type: V, data?: Record<string, any>, originError?: Record<string, any>);
}
export type GraphqlOutputDerivativeError = new (data?: Record<string, any>, originError?: Record<string, any>) => GraphqlOutputError;
export declare class GraphqlOutputErrorList<T = GraphqlOutputError> {
    errors: T[];
    graphqlErrorList: boolean;
    constructor(errors: T[]);
}
export declare const transformErrorToGraphqlErrorOutput: (error: Record<string, any>) => GraphqlOutputErrorList;
