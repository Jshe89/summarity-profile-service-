import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import logger from '@modules/common/service/logger.service';
import { transformErrorToGraphqlErrorOutput, GraphqlOutputErrorList } from '@shared/errors/graphql-output.error';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(catchError((e) => {
        if (!(e instanceof GraphqlOutputErrorList)) {
          e = transformErrorToGraphqlErrorOutput(e);
        }
        e.errors.forEach(error => logger.error(error));
        return of(e);
      }));
  }
}
