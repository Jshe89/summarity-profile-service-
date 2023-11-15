import * as path from 'path';
import * as _ from 'lodash';

export function getCallerFileName(filename: string) {
  const prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = function (skip, s) {
    Error.prepareStackTrace = prepareStackTrace;
    return s;
  };
  const error = new Error();
  const stack = error.stack as unknown as Record<string, any>[];
  const frameIndex = _.findLastIndex(stack, s => s.getFileName() === filename);
  const frame = stack[frameIndex + 1];
  const name = frame.getFileName();
  return _.startCase(path.basename(name, path.extname(name)));
}

export function getErrorMessage(error: Record<string, any>): string {
  const responseMessage = error.response?.message;
  if (!responseMessage) {
    return error.message || 'Server error';
  }
  if (Array.isArray(responseMessage)) {
    return responseMessage[0];
  }
  return responseMessage;
}
