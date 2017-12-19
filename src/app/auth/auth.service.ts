import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// angularfire2
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// rxjs
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private _user: firebase.User;

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  get user(): firebase.User {
    return this._user;
  }

  set user(value: firebase.User) {
    this._user = value;
  }

  get authenticated(): boolean {
    return this._user !== null;
  }

  get uid(): string {
    return this.authenticated ? this.user.uid : '';
  }

  async signInWithGoogle() {
    const response = await this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );

    this.router.navigate(['/questions']);
  }

  signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
}
