import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState } from "./core.state";
import * as MemorizeReducer from "../../memorize/state/memorize.reducer";
import { AuthReducer } from "src/app/auth/store";

export const reducers: ActionReducerMap<AppState> = {
  memorizeItems: MemorizeReducer.reducer,
  auth: AuthReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];
