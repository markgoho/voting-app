import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return (
      this.auth.afAuth.authState
        // .take(1)
        .map(authState => !!authState)
        .do(authenticated => {
          if (!authenticated) {
            this.router.navigate(['admin', 'sign-in']);
          }
        })
    );
  }
}
