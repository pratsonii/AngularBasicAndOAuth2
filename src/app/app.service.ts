
import { Injectable } from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  @Select((state) => state.tokenState.token) token$: Observable<any>;

  constructor (private route: Router) {
    route.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        // console.log('Nav Start');
      }

      if (event instanceof NavigationEnd) {
        // console.log('Nav End');
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }
}
