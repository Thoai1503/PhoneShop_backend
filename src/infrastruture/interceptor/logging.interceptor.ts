import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.originalUrl;
    const headers = request.headers;
    const now = Date.now();
    console.log(
      `[${new Date().toISOString()}] ${method} ${url} Headers: ${JSON.stringify(headers)}`,
    );

    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
