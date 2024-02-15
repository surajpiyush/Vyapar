import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { reducer as PartiesReducer } from "./parties/reducer";
// This reducer is for /Busniess route
import { reducer as BusinessReducer } from "./business/reducer";

let rootReducer = combineReducers({
  PartiesReducer,
  BusinessReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
