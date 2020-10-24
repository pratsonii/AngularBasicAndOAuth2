import { Router } from '@angular/router';
import { AddToken, RemoveToken } from './token.actions';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from "@ngxs/store/operators";

export class TokenStateModel {
  public token: string;
}

@State<TokenStateModel>({
  name: "tokenState",
  defaults: {
    token: "INITIAL",
  },
})

@Injectable()
export class TokenState {

  constructor (private router: Router) { }

  @Action(AddToken)
  addToken(ctx: StateContext<TokenStateModel>, { payload }: AddToken) {
    ctx.setState(patch({ token: payload }));
  }

  @Action(RemoveToken)
  rmeoveToken(ctx: StateContext<TokenStateModel>) {
    ctx.setState(patch({ token: '' }));
    this.router.navigate(['login']);
  }

  @Selector()
  static token(state: TokenStateModel) {
    return state.token;
  }

}