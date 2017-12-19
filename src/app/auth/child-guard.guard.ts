import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable()
export class ChildGuard implements CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
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
