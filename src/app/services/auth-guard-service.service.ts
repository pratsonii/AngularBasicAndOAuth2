import { TokenState } from './../store/token/token.state';

import { Selector, Store } from '@ngxs/store';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor (public store: Store, public router: Router) { }

  canActivate(): boolean {

    const token = this.store.selectSnapshot(TokenState.token);

    if (!token || token === 'INITIAL') {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}