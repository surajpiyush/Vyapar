import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";

import { reducer as ItemReducer } from "./items/reducer";
import { reducer as PartiesReducer } from "./parties/reducer";
import { reducer as BusinessReducer } from "./business/reducer";
import { reducer as PurchaseReducer } from "./purchase/reducer";
// import {reducer as ReportReducer} from "./report/reducer"
import SalesReducer from "./sales/reducer";
const rootReducer = combineReducers({
  ItemReducer,
  PartiesReducer,
  BusinessReducer,
  SalesReducer,
  PurchaseReducer,
  // ReportReducer
});

// Enhance store with Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

/* Notes:

Local Storage Keys:
token : "VYAPAR_TOKEN" 
userId : "VYAPAR_USERID" 
current Active Company : "VYAPAR_CURRENT_COMPANY" 

*/
