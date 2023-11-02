import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  signIn(loginForm: any) {
    return this.http.post(`${this.baseUrl}/api/ath/login`, loginForm);
  }
  signUp(RegisterForm: any) {
    return this.http.post(`${this.baseUrl}/api/ath/register`, RegisterForm, {
      responseType: 'text',
    });
  }
}
