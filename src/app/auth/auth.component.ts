import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  templateUrl: 'auth.component.html'
})
export class AuthComponent {
  constructor(public authService: AuthService) {}
}
