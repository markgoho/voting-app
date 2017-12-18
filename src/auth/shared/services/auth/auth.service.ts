import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Store } from '../../../../store';

import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

export class User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  auth$ = this.af.authState.do((next: firebase.User) => {
    if (!next) {
      this.store.set('user', null);
      return;
    }
    const user: User = {
      email: next.email,
      uid: next.uid,
      authenticated: true
    };
    this.store.set('user', user);
  });

  constructor(private af: AngularFireAuth, private store: Store) {}

  get user(): firebase.User {
    return this.af.auth.currentUser;
  }

  get authState(): Observable<firebase.User> {
    return this.af.authState;
  }

  loginWith(providerName: string): firebase.Promise<any> {
    let provider: firebase.auth.AuthProvider = null;

    switch (providerName) {
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider();
        break;
    }

    return this.af.auth.signInWithPopup(provider);
  }

  logoutUser() {
    return this.af.auth.signOut();
  }
}
