import { AuthState } from 'src/app/auth/store/reducer/auth.reducer';
import { MemorizeState } from 'src/app/memorize/store';

export interface AppState {
  memorizeItems: MemorizeState;
  auth: AuthState;
}
