import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const loadCheckAuth = createAction('[CheckAuth] Load CheckAuth');

export const loadCheckAuthSuccess = createAction(
  '[CheckAuth] Load CheckAuth Success',
  props<{ data: { user: User } }>()
);

export const loadCheckAuthFailure = createAction('[CheckAuth] Load CheckAuth Failure', props<{ error: string }>());
