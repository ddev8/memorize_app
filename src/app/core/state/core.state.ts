import { AuthState } from 'src/app/auth/store/reducer/auth.reducer';
import { MemorizeState } from '../../memorize/state';

export interface AppState {
  memorizeItems: MemorizeState;
  auth: AuthState;
}
