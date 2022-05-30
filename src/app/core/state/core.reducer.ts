import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState } from "./core.state";
import { AuthReducer } from "src/app/auth/store";
import { MemorizeReducer } from "src/app/memorize/store";

export const reducers: ActionReducerMap<AppState> = {
  memorizeItems: MemorizeReducer,
  auth: AuthReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];
