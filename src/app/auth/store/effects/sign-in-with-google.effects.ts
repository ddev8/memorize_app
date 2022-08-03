import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { loadSignInWithGoogle, loadSignInWithGoogleFailure, loadSignInWithGoogleSuccess } from '..';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class SignInWithGoogleEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  public signInWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSignInWithGoogle),
      switchMap(async () => {
        return this.authService
          .signInWithGoogle()
          .then((payload) => {
            if (payload.user !== null) {
              const authUser: User = <any>{
                uid: payload.user.uid,
                email: payload.user.email,
                name: payload.user.displayName,
                photoUrl: payload.user.photoURL,
                emailVerified: payload.user.emailVerified,
              };
              return loadSignInWithGoogleSuccess({ data: { user: authUser } });
            } else {
              return loadSignInWithGoogleFailure({
                error: 'No user found',
              });
            }
          })
          .catch((error) => {
            return loadSignInWithGoogleFailure({ error });
          });
      })
    );
  });

  private signInWithGoogleSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadSignInWithGoogleSuccess),
        tap(() => this.router.navigate(['/']))
      );
    },
    {
      dispatch: false,
    }
  );
}
