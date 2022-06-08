import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../models/user';
import { authFeatureKey, AuthState } from '../reducer/auth.reducer';

const selectAuthFeature = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUser = createSelector(
  selectAuthFeature,
  (state: AuthState): User | null => state.user
);
export const selectAuthLoading = createSelector(
  selectAuthFeature,
  (state: AuthState): boolean => state.loading
);
export const selectAuthError = createSelector(
  selectAuthFeature,
  (state: AuthState): string | null => state.error
);
