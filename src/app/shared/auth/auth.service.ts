import { Injectable, NgZone } from '@angular/core';
import {
  AngularFireAuth
} from '@angular/fire/compat/auth';
import { AuthProvider, GoogleAuthProvider, UserInfo } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user$: Subject<User | undefined> = new Subject();

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
          console.log(this.user$);
        }
      })
  }

  public googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  /* Sign out */
  public signOut(): void {
    this.afAuth.signOut().then(() => {
      this.user$.next(undefined);
      this.router.navigate(['login']);
    })
  }

  public getUser(): Subject<User | undefined> {
    return this.user$;
  }

  private authLogin(provider: AuthProvider): void {
    this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
            this.router.navigate(['/']);
          })
        // this.SetUserData(result.user);
        console.log(result.user, " USER");
      }).catch((error) => {
        window.alert(error)
      })
  }
}

function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null;
}
