import { validateOrReject, ValidationArguments, ValidationError } from 'class-validator';
import _  from 'lodash';
import { BaseError } from '@shared/errors/base.error';
import { GraphqlOutputDerivativeError, GraphqlOutputError } from '@shared/errors/graphql-output.error';

export function validationMessage(errorClass: GraphqlOutputDerivativeError) {
  return function message(data: ValidationArguments) {
    const error = errorClass.length ? new errorClass(data.object) : new errorClass();
    return error.toStringMessage();
  };
}

export async function validateSchema<T extends Record<string, any>>(schema: new () => T, data: T) {
  await validateOrReject(Object.assign(new schema(), data));
}

export function isSchemaValidationErrors(errors?: any): errors is ValidationError[] {
  if (!errors || !Array.isArray(errors)) {
    return false;
  }
  return errors[0] instanceof ValidationError;
}

export function extractValidationErrors(errors: ValidationError[]): GraphqlOutputError[] {
  const extractedErrors = [];
  errors.forEach(error => {
    extractedErrors.push(
      ...Object.values(error.constraints).map(message => {
        if (BaseError.isBaseError(message)) {
          const parsedError = BaseError.parseFromString(message);
          return Object.assign(
            new GraphqlOutputError(parsedError.message, parsedError.type, parsedError.data, parsedError.originError),
            BaseError.parseFromString(message)
          );
        }
        return new GraphqlOutputError(
          message,
          _.snakeCase(error.target?.constructor?.name || 'validationError').toUpperCase(),
          error.target
        );
      })
    );
  });
  return extractedErrors;
}
