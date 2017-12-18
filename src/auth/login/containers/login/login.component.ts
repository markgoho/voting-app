import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <app-auth-form (login)="loginWith($event)">
        <h1>Login</h1>
      </app-auth-form>
    </div>
  `
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async loginWith(service: string) {
    try {
      await this.authService.loginWith(service);
      this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
    }
  }
}
