import { legacy_createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";

import { reducer as ItemReducer } from "./items/reducer";
import {reducer as PurchaseReducer} from "./purchase/reducer"
import { reducer as BusinessReducer } from "./business/reducer";


import SalesReducer from "./sales/reducer";
import purchaseBillReducer from "./purchaseBillSlice";
import paymentOutReducer from "./paymentOutSlice";

const rootReducer = combineReducers({
  ItemReducer,
  BusinessReducer,
  PurchaseReducer,
  SalesReducer,
  purchaseBillReducer: purchaseBillReducer,
  paymentOutReducer: paymentOutReducer,
});

// Enhance store with Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
