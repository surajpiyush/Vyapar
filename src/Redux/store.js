import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";

import { reducer as ItemReducer } from "./items/reducer";
import { reducer as PartiesReducer } from "./parties/reducer";
import { reducer as BusinessReducer } from "./business/reducer";
import SalesReducer from "./sales/reducer";
import purchaseBillReducer from "./purchaseBillSlice";
import paymentOutReducer from "./paymentOutSlice";

const rootReducer = combineReducers({
  ItemReducer,
  PartiesReducer,
  BusinessReducer,
  SalesReducer,
  purchaseBillReducer: purchaseBillReducer,
  paymentOutReducer: paymentOutReducer,
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
