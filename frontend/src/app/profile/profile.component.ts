import { Component } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  logOut: any;
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  onLogout(): void {
    this.authService.logout();
  }
}
