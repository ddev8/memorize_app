import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { loadCheckAuth, loadCheckAuthFailure, loadCheckAuthSuccess } from '..';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';



@Injectable()
export class CheckAuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  public checkAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCheckAuth),
      switchMap(() => {
        return this.authService.checkAuthState()
          .pipe(
            map((user) => {
              if (user !== null) {
                const authUser: User = {
                  uid: user.uid,
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                  emailVerified: user.emailVerified
                };

                return loadCheckAuthSuccess({ data: { user: authUser }});
              } {
                return loadCheckAuthFailure({ error: 'No user found'});
              }
            }),
            catchError((error) => of(loadCheckAuthFailure({ error })))
          )
      })
    )
  })

  private checkAuthSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCheckAuthSuccess),
      tap(() => {
        this.router.navigate(['/']);
      })
    )
  }, { dispatch: false })
}
