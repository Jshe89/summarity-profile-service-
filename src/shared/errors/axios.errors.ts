import { HttpException, HttpStatus } from '@nestjs/common';

export class AxiosGatewayError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);

    Object.defineProperty(this, 'name', { value: 'AxiosGatewayError' });
  }
}

export class AxiosUnprocessableError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);

    Object.defineProperty(this, 'name', { value: 'AxiosUnprocessableError' });
  }
}

export class AxiosRequestTimeoutError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.REQUEST_TIMEOUT);

    Object.defineProperty(this, 'name', { value: 'AxiosRequestTimeoutError' });
  }
}


export function handleAxiosError(error: any) {
  if (error?.response?.status === HttpStatus.INTERNAL_SERVER_ERROR && error.response.data?.ExceptionMessage) {
    throw new AxiosGatewayError(error.response.data?.ExceptionMessage);
  }
  if (
    (error.response && error.response.status === HttpStatus.REQUEST_TIMEOUT) ||
    (error.code && error.code === 'ECONNABORTED')
  ) {
    throw new AxiosRequestTimeoutError(error.config.data);
  }
  throw new AxiosGatewayError(
    error.response?.data ||
    error.response ||
    error.config?.data ||
    error
  );
}
