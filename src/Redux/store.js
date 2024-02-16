import { reducer as PartiesReducer } from "./parties/reducer";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as ItemReducer } from "./items/reducer";
import { thunk } from "redux-thunk";
let rootReducer = combineReducers({
   PartiesReducer,
   ItemReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
