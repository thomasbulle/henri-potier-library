import { combineReducers } from "redux";

// Reducers
import cart from "./cart";
import app from "./app";

// Small reducer to store the last action
function lastAction(state = null, action) {
  return action;
}

const allReducers = combineReducers({
  cart,
  app,
  lastAction
});

export default allReducers;
