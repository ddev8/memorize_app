import { createAction, props } from '@ngrx/store';

export const loadSignOut = createAction(
  '[SignOut] Load SignOut'
);

export const loadSignOutSuccess = createAction(
  '[SignOut] Load SignOut Success',
);

export const loadSignOutFailure = createAction(
  '[SignOut] Load SignOut Failure',
  props<{ error: string }>()
);
