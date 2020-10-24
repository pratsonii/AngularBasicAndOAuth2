import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
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

  constructor (private http: HttpClient) { }

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
}
