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

  get user(): any {
    return this._user;
  }

  set user(value: any) {
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
    console.log(response);
  }

  signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
}
