import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const loadSignInWithGoogle = createAction(
  '[SignInWithGoogle] Load SignInWithGoogle'
);

export const loadSignInWithGoogleSuccess = createAction(
  '[SignInWithGoogle] Load SignInWithGoogle Success',
  props<{ data: { user: User }}>()
);

export const loadSignInWithGoogleFailure = createAction(
  '[SignInWithGoogle] Load SignInWithGoogle Failure',
  props<{ error: string }>()
);
