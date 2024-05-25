import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Ensure this is the correct way to import thunk
import entityReducer from "./reducers";

const rootReducer = combineReducers({
  entities: entityReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
