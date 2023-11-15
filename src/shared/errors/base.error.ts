import { randomUUID } from 'crypto';
import * as _ from 'lodash';
import { getCallerFileName } from '@shared/helpers/error.helper';

const ERROR_STRING_PREFIX = 'BASE_ERROR:';

export class BaseError<T extends string = string, V = string> {
  static isBaseError(error: string)  {
    return _.startsWith(error, ERROR_STRING_PREFIX);
  }

  static parseFromString(error: string)  {
    return JSON.parse(error.replace(ERROR_STRING_PREFIX, '')) as BaseError;
  }

  message: T;
  type: V;
  id: string;
  data?: Record<string, any>;
  originError?: Record<string, any>;
  callerName?: string;

  constructor(message: T, type: V, data?: Record<string, any>, originError?: Record<string, any>) {
    this.id = randomUUID();
    this.message = message;
    this.type = type;
    this.data = data;
    const error = originError ? originError : new Error(message);
    this.originError = {
      message: error.message,
      stack: error.stack,
    };
  }

  setCallerName(filename: string) {
    this.callerName = getCallerFileName(filename);
  }

  toStringMessage() {
    return `${ERROR_STRING_PREFIX}${JSON.stringify(this)}`;
  }
}
