import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import { loadCheckAuth, loadCheckAuthFailure, loadCheckAuthSuccess } from '../actions/check-auth.actions';
import { loadSignInWithGoogle, loadSignInWithGoogleFailure, loadSignInWithGoogleSuccess } from '../actions/sign-in-with-google.actions';
import { loadSignOut, loadSignOutFailure, loadSignOutSuccess } from '../actions/sign-out.actions';


export const authFeatureKey = 'auth';

export interface State {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  user: null,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(loadCheckAuth, (state): State => ({ ...state, loading: true})),
  on(loadCheckAuthSuccess, (state, action): State => ({ ...state, loading: false, user: action.data.user })),
  on(loadCheckAuthFailure, (state, action): State => ({...state, loading: false, error: action.error})),
  on(loadSignInWithGoogle, (state): State => ({ ...state, loading: true})),
  on(loadSignInWithGoogleSuccess, (state, action): State => ({ ...state, loading: false, user: action.data.user })),
  on(loadSignInWithGoogleFailure, (state, action): State => ({...state, loading: false, error: action.error})),
  on(loadSignOut, (state): State => ({ ...state, loading: true})),
  on(loadSignOutSuccess, (state, action): State => ({ ...state, loading: false })),
  on(loadSignOutFailure, (state, action): State => ({...state, loading: false, error: action.error})),
);
