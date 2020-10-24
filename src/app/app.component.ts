import { AppService } from './app.service';
import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OAuth2AndBasic';

  constructor () {
  }
}
