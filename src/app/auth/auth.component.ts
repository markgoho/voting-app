import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  template: `
    <div *ngIf="authService.user$ | async; let user; else showLogin">
      <h1>Hello {{ user.displayName }}!</h1>
      <button (click)="logout()">Logout</button>
    </div>

    <ng-template #showLogin>
      <p>Please login.</p>
      <button (click)="login()">Login with Google</button>
    </ng-template>
  `
})
export class AuthComponent {
  constructor(public authService: AuthService) {}

  login() {
    this.authService.signInWithGoogle();
  }

  logout() {
    this.authService.signOut();
  }
}
