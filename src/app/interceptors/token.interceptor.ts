import { TokenState } from './../store/token/token.state';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor (public store: Store) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.headers.get('Authorization')) {
      const token = this.store.selectSnapshot(TokenState.token);
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return next.handle(request);
  }
}