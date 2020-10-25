import { Router } from '@angular/router';
import { RemoveToken } from './../../store/token/token.actions';
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Store } from '@ngxs/store';
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  ipUrl: string = "http://localhost:8080/app/userInfo";

  firstName: string;
  lastName: string;
  email: string;

  constructor (private http: HttpClient, private store: Store, private router: Router) { }

  ngOnInit() {
    this.getUserInfo().subscribe((data: any) => {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
    });
  }

  getUserInfo() {
    return this.http.get(this.ipUrl);
  }

  logout() {
    this.store.dispatch(new RemoveToken).subscribe(data => {
      this.router.navigate(['login']);
    });
  }
}
