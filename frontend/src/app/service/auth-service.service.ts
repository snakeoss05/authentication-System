import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private isAuthenticatede: boolean = false;

  constructor(private cookieService: CookieService, private router: Router) {
    const jwtToken = this.cookieService.get('jwtToken');
    if (jwtToken) {
      this.isAuthenticatede = true;
    } else this.isAuthenticatede = false;
  }

  setJwtTokenInCookie(token: string): void {
    this.cookieService.set(
      'jwtToken',
      token,
      new Date(new Date().getTime() + 60 * 60 * 1000)
    );
    this.isAuthenticatede = true;
    this.router.navigate(['/profile']);
  }
  logout(): void {
    this.isAuthenticatede = false;
    this.cookieService.delete('jwtToken');
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return this.isAuthenticatede;
  }
}
