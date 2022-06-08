import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { loadSignOut, loadSignOutFailure, loadSignOutSuccess } from '..';
import { AuthService } from '../../services/auth.service';



@Injectable()
export class SignOutEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  public signout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSignOut),
      switchMap(async () => {
        return this.authService
          .signOut()
          .then(() => {
            return loadSignOutSuccess();
          })
          .catch((error) => {
            return loadSignOutFailure({ error });
          });
      })
    );
  });

  private signoutSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadSignOutSuccess),
        tap(() => this.router.navigate(['/login']))
      );
    },
    {
      dispatch: false,
    }
  );

}
