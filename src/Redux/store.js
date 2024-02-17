import {
  legacy_createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";
import { thunk } from "redux-thunk";

import { reducer as ItemReducer } from "./items/reducer";
import {reducer as PurchaseReducer} from "./purchase/reducer"
import { reducer as BusinessReducer } from "./business/reducer";


const rootReducer = combineReducers({
  ItemReducer,
  BusinessReducer,
  PurchaseReducer
 
});

// Enhance store with Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
