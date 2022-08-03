import { AuthProvider, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

const auth_state: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

export class AngularFireAuthMock {
  authState: Observable<any | null> = new Observable((observer) => {
    auth_state.subscribe({
      next: (val) => {
        observer.next(val);
      },
    });

    return observer;
  });
  signOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      auth_state.next(null);
      resolve();
    });
  }
  signInWithPopup(provider: AuthProvider): Promise<any> {
    return new Promise((resolve, reject) => {
      if (provider) {
        auth_state.next({
          uid: '9Corylm9Ooc9HDTsaJnEoQ5OkJe2',
          displayName: 'Tester',
          email: 'test@example.com',
          emailVerified: true,
          photoURL: '',
        });
        resolve('Credentials');
      } else {
        reject('Provider error.');
      }
    });
  }
}
