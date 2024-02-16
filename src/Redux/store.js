import { reducer as PartiesReducer } from "./parties/reducer";
import purchaseBillReducer from "./purchaseBillSlice";
import paymentOutReducer from "./paymentOutSlice";

let rootReducer = combineReducers({
  PartiesReducer,
  purchaseBill: purchaseBillReducer,
  paymentOut: paymentOutReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
