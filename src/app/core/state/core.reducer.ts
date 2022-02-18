import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { State } from "./core.state";
import * as MemorizeReducer from "../../memorize/state/memorize.reducer";

export const reducers: ActionReducerMap<State> = {
  memorizeItems: MemorizeReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
