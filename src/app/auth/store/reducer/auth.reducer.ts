import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import { loadCheckAuth, loadCheckAuthFailure, loadCheckAuthSuccess } from '../actions/check-auth.actions';
import { loadSignInWithGoogle, loadSignInWithGoogleFailure, loadSignInWithGoogleSuccess } from '../actions/sign-in-with-google.actions';
import { loadSignOut, loadSignOutFailure, loadSignOutSuccess } from '../actions/sign-out.actions';


export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

export const AuthReducer = createReducer(
  initialState,
  on(loadCheckAuth, (state): AuthState => ({ ...state, loading: true})),
  on(loadCheckAuthSuccess, (state, action): AuthState => ({ ...state, loading: false, user: action.data.user })),
  on(loadCheckAuthFailure, (state, action): AuthState => ({...state, loading: false, error: action.error})),
  on(loadSignInWithGoogle, (state): AuthState => ({ ...state, loading: true})),
  on(loadSignInWithGoogleSuccess, (state, action): AuthState => ({ ...state, loading: false, user: action.data.user })),
  on(loadSignInWithGoogleFailure, (state, action): AuthState => ({...state, loading: false, error: action.error})),
  on(loadSignOut, (state): AuthState => ({ ...state, loading: true})),
  on(loadSignOutSuccess, (state): AuthState => ({ ...state, loading: false })),
  on(loadSignOutFailure, (state, action): AuthState => ({...state, loading: false, error: action.error})),
);
