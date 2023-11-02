import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { AuthServiceService } from '../service/auth-service.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('300ms ease-in')),
      transition(':leave', animate('300ms ease-out')),
    ]),
  ],
})
export class LoginComponent {
  myForm: FormGroup;
  mylogin: FormGroup;
  show: boolean = false;
  step: string = 'signin';
  responseMessageSuccess: string = '';
  responseMessageErreur: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authservice: AuthServiceService
  ) {
    this.myForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
    this.mylogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  passwordMatchValidator(formGroup: any) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword').setErrors(null);
    }
  }

  onSubmitRegister() {
    if (this.myForm.valid) {
      this.loginService.signUp(this.myForm.value).subscribe(
        (response) => {
          this.responseMessageSuccess = response;
          setTimeout(() => (this.responseMessageSuccess = ''), 1000);
        },
        (error) => {
          console.log(error);
          this.responseMessageErreur = error.error;
          setTimeout(() => (this.responseMessageErreur = ''), 1000);
        }
      );
    } else {
      this.myForm.setErrors({ passwordMismatch: true });
    }
  }
  onSubmitLogin() {
    this.loginService.signIn(this.mylogin.value).subscribe(
      (response: any) => {
        this.authservice.setJwtTokenInCookie(response.token);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  SwitchSign(state: string) {
    this.step = state;
  }
  showPassword() {
    this.show = !this.show;
  }
}
