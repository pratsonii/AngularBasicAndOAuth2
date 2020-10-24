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
  validateForm: FormGroup;
  loggedIn: boolean = false;
  userName: string;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    let password: string = this.validateForm.get("password").value;
    let email: string = this.validateForm.get("userName").value;

    this.loginService.doLogin(email, password);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService:LoginService
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  register() {
    this.router.navigate(["/register"], { skipLocationChange: true });
  }

  oAuthLogin(){
    window.location.href='http://localhost:8080/oauth/autherization/' + 'google' + '?redirect_uri="http://localhost:4200/"';
  }
}
