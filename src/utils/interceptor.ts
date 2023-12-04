import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>): void => {
          if (event instanceof HttpResponse) {
            this.handleSuccess(event);
          }
        },
        (error: HttpErrorResponse): void => {
          this.handleError(error);
        }
      )
    );
  }

  private handleSuccess(event: HttpResponse<any>): void {
    if (event.status >= 200 && event.status < 300) {
      this.toastr.success('Operação bem-sucedida!', 'Sucesso');
    }
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status >= 400 && error.status < 500) {
      this.toastr.error('Erro na requisição. Por favor, tente novamente.', 'Erro');
    } else if (error.status >= 500) {
      this.toastr.error('Erro interno do servidor. Por favor, tente novamente mais tarde.', 'Erro');
    }
  }
}
