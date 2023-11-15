import { ValidationArguments, ValidationError } from 'class-validator';
import { GraphqlOutputDerivativeError, GraphqlOutputError } from '@shared/errors/graphql-output.error';
export declare function validationMessage(errorClass: GraphqlOutputDerivativeError): (data: ValidationArguments) => string;
export declare function validateSchema<T extends Record<string, any>>(schema: new () => T, data: T): Promise<void>;
export declare function isSchemaValidationErrors(errors?: any): errors is ValidationError[];
export declare function extractValidationErrors(errors: ValidationError[]): GraphqlOutputError[];
