import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
          next: (event: HttpEvent<any>): void => {
            if (event instanceof HttpResponse) {
              this.handleSuccess(event, request);
            }
          },
          error: (error: HttpErrorResponse): void => {
            this.handleError(error, request);
          }
        })
    );
  }

  private handleSuccess(event: HttpResponse<any>, request: HttpRequest<any>): void {
    if (event.status >= 200 && event.status < 300 && request.method != 'GET') {
      this.toastr.success('Operação bem-sucedida!', 'Sucesso');
    }
  }

  private handleError(error: HttpErrorResponse, request: HttpRequest<any>): void {
    if (error.status >= 400 && error.status < 500 && request.method != 'GET') {
      this.toastr.error('Erro na requisição. Por favor, tente novamente.', 'Erro');
    } else if (error.status >= 500) {
      this.toastr.error('Erro interno do servidor. Por favor, tente novamente mais tarde.', 'Erro');
    }
  }
}
