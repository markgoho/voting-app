import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  private _user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    afAuth.idToken.subscribe(user => (this.user = user));
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

  get id(): string {
    return this.authenticated ? this.user.uid : '';
  }

  async signInWithGoogle() {
    const response = await this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    return this.db.object(`/users/${response.user.uid}`).subscribe(user => {
      if (!user.$exists()) {
        const {
          displayName,
          email,
          emailVerified,
          photoURL,
          uid
        } = response.user;
        this.db.object(`/users/${response.user.uid}`).set({
          displayName,
          email,
          emailVerified,
          photoURL,
          uid
        });
      }
    });
  }

  signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
}
