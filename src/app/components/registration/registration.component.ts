import { User } from 'src/app/interface/user';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { trigger, style, transition, animate } from "@angular/animations";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
  animations: [
    trigger("flyInOut", [
      transition(":enter", [
        style({ transform: "translateY(100%)" }),
        animate(350),
      ]),
    ]),
  ],
})
export class RegistrationComponent implements OnInit {
  validateForm: FormGroup;
  errorMessage: string;

  submitForm(): void {
    console.log("submitForm");
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    let user: User = {
      email: this.validateForm.get("email").value,
      password: this.validateForm.get("password").value,
      firstName: this.validateForm.get("firstName").value,
      lastName: this.validateForm.get("lastName").value,
    };


    if (this.errorMessage) {
      this.message.error(this.errorMessage, { nzDuration: 3000 });
      this.errorMessage = null;
      this.validateForm.reset();
    } else {
      this.message.success("Registration successfull !", {
        nzDuration: 3000,
      });
      setTimeout(() => {
        this.route.navigate(["/login"],);
      }, 4000);
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean; } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor (
    private fb: FormBuilder,
    private route: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      agree: [false],
    });
  }
}
