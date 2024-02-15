

import {reducer as PartiesReducer} from "./parties/reducer";

let rootReducer=combineReducers({
PartiesReducer
})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))