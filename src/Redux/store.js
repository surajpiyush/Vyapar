import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";

import { reducer as PartiesReducer } from "./Parties/reducer";
import { reducer as BusinessReducer } from "./business/reducer";
import { reducer as ItemReducer } from "./items/reducer";
import { reducer as PurchaseReducer } from "./purchase/reducer";
import { reducer as ReportReducer } from "./report/reducer";
import SalesReducer from "./sales/reducer";

const rootReducer = combineReducers({
  ItemReducer,
  PartiesReducer,
  BusinessReducer,
  SalesReducer,
  PurchaseReducer,
  ReportReducer,
});

// Enhance store with Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Local Storage / Session Storage Keys
export const TOKEN = "TOKEN";
export const USER_ID = "USER_ID";
export const USER_DETAILS = "USER_DETAILS";
export const REGULAR_PRINTER_DATA = "REGULAR_PRINTER_DATA";
export const THERMAL_PRINTER_DATA = "THERMAL_PRINTER_DATA";
