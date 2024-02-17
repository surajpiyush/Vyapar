import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";

import { reducer as partiesReducer } from "./parties/reducer";
import { reducer as businessReducer } from "./business/reducer";
import purchaseBillReducer from "./purchaseBillSlice";
import paymentOutReducer from "./paymentOutSlice";

const rootReducer = combineReducers({
  parties: partiesReducer,
  business: businessReducer,
});

// Enhance store with Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
