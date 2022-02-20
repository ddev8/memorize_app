import { Injectable, NgZone } from '@angular/core';
import {
  AngularFireAuth
} from '@angular/fire/compat/auth';
import { AuthProvider, GoogleAuthProvider, UserInfo } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FirebaseError } from '@angular/fire/app/firebase';

import { User } from 'src/app/auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$: Subject<User | undefined> = new Subject();
  private userUID: string = '';

  constructor(
    private readonly afAuth: AngularFireAuth, // Inject Firebase auth service
    private readonly ngZone: NgZone,
    private readonly router: Router,
  ) {
    this.afAuth.authState
      .pipe(
        filter(isNonNull),
      )
      .subscribe({
        next: (user) => {
          this.user$.next({
            uid: user.uid,
            displayName: user.displayName ? user.displayName : '',
            email: user.email ? user.email : '',
            emailVerified: user.emailVerified,
            photoURL: user.photoURL ? user.photoURL : '',
          });
          this.userUID = user.uid;

          this.router.navigate(['/']);
        }
      })
  }

  public googleAuth() {
    return this.authLogin(new GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' }));
  }

  /* Sign out */
  public signOut(): void {
    this.afAuth.signOut().then(() => {
      this.user$.next(undefined);
      this.userUID = '';
      this.router.navigate(['login']);
    })
  }

  public getUser(): Subject<User | undefined> {
    return this.user$;
  }

  public getUserUID(): string {
    return this.userUID;
  }

  private authLogin(provider: AuthProvider): void {
    this.afAuth.signInWithPopup(provider)
      .catch((error) => {
        this.errorHandler(error)
      })
  }

  private errorHandler(e: unknown): Error {
    console.error(e);
    const message: string = typeof e === 'object' && e !== null && e.hasOwnProperty('code')
      ? `${(<FirebaseError>e).name}: ${(<FirebaseError>e).code}`
      : 'Unknown error. Check console.';

    return new Error(message);
  }
}

function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null;
}
