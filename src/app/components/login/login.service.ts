import { Router } from '@angular/router';
import { AddToken } from './../../store/token/token.actions';
import { Store } from '@ngxs/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  tokenURL = 'http://localhost:8080/app/token';

  constructor (
    private http: HttpClient,
    private message: NzMessageService,
    private store: Store,
    private router: Router
  ) { }

  doLogin(userName: string, password: string) {
    let encoded = window.btoa(userName + ':' + password);

    const headers = new HttpHeaders().set('Authorization', 'Basic ' + encoded);

    this.http.get(this.tokenURL, { headers, })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)))
      .subscribe((data: any) => {
        this.store.dispatch(new AddToken(data.token)).subscribe();
        this.router.navigate(['home']);
      });
  }

  handleError(error) {
    if (error.status == 401) {
      this.message.error('Username/Password Incorrect!', {
        nzDuration: 3000,
      });
    }
    return throwError(error);
  }
}
