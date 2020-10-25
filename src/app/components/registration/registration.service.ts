import { User } from './../../interface/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  registrationURL = 'http://localhost:8080/app/register';

  constructor (private http: HttpClient, private router: Router) { }

  doRegistration(user: User) {
    this.http.post(this.registrationURL, user).subscribe(data => {
      console.log(data);
      this.router.navigate(['login']);
    });
  }
}
