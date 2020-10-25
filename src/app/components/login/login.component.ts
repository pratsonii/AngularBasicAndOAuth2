import { LoginService } from './login.service';
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { trigger, style, transition, animate } from "@angular/animations";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [
    trigger("flyInOut", [
      transition(":enter", [
        style({ transform: "translateX(-100%)" }),
        animate(350)
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loggedIn: boolean = false;
  userName: string;

  constructor (private fb: FormBuilder, private router: Router, private loginService: LoginService) { }

  submitForm(): void {
    this.validateForm();

    //checks if all fields are valid or not
    if (this.loginForm.invalid) return;

    this.doLogin();
  }

  private doLogin() {
    let password: string = this.loginForm.get("password").value;
    let email: string = this.loginForm.get("userName").value;

    this.loginService.doLogin(email, password);
  }

  private validateForm() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  register() {
    this.router.navigate(["/register"], { skipLocationChange: true });
  }

  oAuthLogin(authProvider: string) {
    window.location.href = 'http://localhost:8080/oauth/autherization/' + authProvider + '?redirect_uri="http://localhost:4200/"';
  }
}
