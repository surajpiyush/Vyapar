<<<<<<< HEAD
import { reducer as PartiesReducer } from "./parties/reducer";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as ItemReducer } from "./items/reducer";
import { thunk } from "redux-thunk";
let rootReducer = combineReducers({
   PartiesReducer,
   ItemReducer,
});

=======
import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { reducer as PartiesReducer } from "./parties/reducer";
import { reducer as BusinessReducer } from "./business/reducer";
import purchaseBillReducer from "./purchaseBillSlice";
import paymentOutReducer from "./paymentOutSlice";

let rootReducer = combineReducers({
  PartiesReducer,
  BusinessReducer,
  purchaseBill: purchaseBillReducer,
  paymentOut: paymentOutReducer,
});

>>>>>>> 63c11ce9a353e5fa09a5d7f4788ea79ff9e18000
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
