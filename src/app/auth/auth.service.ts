import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// angularfire2
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// rxjs
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { User } from './user.model';

@Injectable()
export class AuthService {
  user$: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.user$ = afAuth.authState.pipe(
      switchMap(
        (user: firebase.User) =>
          user
            ? this.db.doc<User>(`users/${user.uid}`).valueChanges()
            : of(null)
      )
    );
  }

  async signInWithGoogle() {
    const response = await this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    await this.updateUserData(response.user);
    this.router.navigate(['/questions']);
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data);
  }

  async signOut(): Promise<any> {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/auth']);
  }
}
