import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import offers from "./offers";
import user from "./user";

export default combineReducers({
  auth,
  message,
  user,
  offers
});