import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { FirebaseError } from '@angular/fire/app/firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}

  public checkAuthState(): Observable<firebase.default.User | null> {
    return this.afAuth.authState;
  }

  public signInWithGoogle(): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' }));
  }

  /* Sign out */
  public signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  private errorHandler(e: unknown): Error {
    console.error(e);
    const message: string =
      typeof e === 'object' && e !== null && e.hasOwnProperty('code')
        ? `${(<FirebaseError>e).name}: ${(<FirebaseError>e).code}`
        : 'Unknown error. Check console.';

    return new Error(message);
  }
}

function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null;
}
