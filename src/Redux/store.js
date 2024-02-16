
import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { reducer as ItemReducer } from "./items/reducer";
import { reducer as PartiesReducer } from "./parties/reducer";
import { reducer as BusinessReducer } from "./business/reducer";
import purchaseBillReducer from "./purchaseBillSlice";
import paymentOutReducer from "./paymentOutSlice";

let rootReducer = combineReducers({
  PartiesReducer, ItemReducer,
  BusinessReducer,
  purchaseBill: purchaseBillReducer,
  paymentOut: paymentOutReducer,
});


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
