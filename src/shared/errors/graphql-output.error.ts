import { getErrorMessage } from '@shared/helpers/error.helper';
import { isSchemaValidationErrors, extractValidationErrors } from '@shared/helpers/validate-schema.helper';
import { BaseError } from './base.error';

export class GraphqlOutputError<T extends string = string, V = string> extends BaseError<T, V> {
  graphqlError = true;

  constructor(message: T, type: V, data?: Record<string, any>, originError?: Record<string, any>) {
    super(message, type, data, originError);

    Object.defineProperty(this, 'name', {
      value: 'GraphqlOutputError',
      configurable: true
    });
    this.setCallerName(__filename);
  }
}

export type GraphqlOutputDerivativeError = new (data?: Record<string, any>, originError?: Record<string, any>) => GraphqlOutputError;

export class GraphqlOutputErrorList<T = GraphqlOutputError> {
  errors: T[];
  graphqlErrorList = true;

  constructor(errors: T[]) {
    this.errors = errors;
  }
}

export const transformErrorToGraphqlErrorOutput = (error: Record<string, any>): GraphqlOutputErrorList => {
  if (isSchemaValidationErrors(error)) {
    return new GraphqlOutputErrorList(extractValidationErrors(error));
  }
  return new GraphqlOutputErrorList([
    error instanceof GraphqlOutputError
      ? error
      : new GraphqlOutputError(
        getErrorMessage(error),
        error.type || error.code || error.extensions?.code || error.name || typeof error,
        {},
        error
      )
  ]);
};

