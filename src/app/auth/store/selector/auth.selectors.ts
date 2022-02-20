import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from '../reducer/auth.reducer';

const selectAuthFeature = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUser = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.user
);
export const selectAuthLoading = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.loading
);
export const selectAuthError = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.error
);
