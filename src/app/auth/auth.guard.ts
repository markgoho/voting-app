import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.afAuth.authState.pipe(
      take(1),
      map(authState => !!authState),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['admin', 'sign-in']);
        }
      })
    );
  }
}
