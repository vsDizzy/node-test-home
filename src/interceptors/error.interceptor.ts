import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  ConflictException
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(
        (err: any): Observable<never> => {
          if (err && err.name === 'ValidationError') {
            err = new BadRequestException(err.errors)
          } else if (err && err.code === 11000) {
            err = new ConflictException('Data duplicated!')
          }

          return throwError(err)
        }
      )
    )
  }
}
