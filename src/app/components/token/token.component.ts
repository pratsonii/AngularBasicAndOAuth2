import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddToken } from './../../store/token/token.actions';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit, OnDestroy {

  private sub: any;
  constructor (private route: ActivatedRoute, private store: Store, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.store.dispatch(new AddToken(params['value'])).subscribe();
      this.router.navigate(['home']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
