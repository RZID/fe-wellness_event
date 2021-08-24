import { combineReducers } from "redux";
import auth from "./auth";
import event from "./event";
import confirmEvent from "./confirmEvent";
import addEvent from "./addEvent";

const rootReducers = combineReducers({
  auth,
  event,
  confirmEvent,
  addEvent
});

export default rootReducers;
