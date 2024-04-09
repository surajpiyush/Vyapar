import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import SalesReducer from "./sales/reducer";
import { reducer as BusinessReducer } from "./business/reducer";
import { reducer as ItemReducer } from "./items/reducer";
import { reducer as PartiesReducer } from "./parties/reducer";
import { reducer as PurchaseReducer } from "./purchase/reducer";
import { reducer as ReportReducer } from "./report/reducer";
import { reducer as SettingReducer } from "./setting/reducer";
import { reducer as ExpenseReducer } from "./expenses/reducer";
const rootReducer = combineReducers({
   ItemReducer,
   PartiesReducer,
   BusinessReducer,
   SalesReducer,
   PurchaseReducer,
   ReportReducer,
   SettingReducer,
   ExpenseReducer,
});

// Enhance store with Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk))
);

// ------------------ API URL -----------------
export const API_URL = "https://asaanly.in";

// Local Storage / Session Storage Keys
export const TOKEN = "TOKEN";
export const USER_ID = "USER_ID";
export const USER_DETAILS = "USER_DETAILS";
export const REGULAR_PRINTER_DATA = "REGULAR_PRINTER_DATA";
export const THERMAL_PRINTER_DATA = "THERMAL_PRINTER_DATA";
