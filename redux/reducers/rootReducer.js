// ** Redux Imports
import { combineReducers } from "redux";

// ** Reducers Imports
import { login } from "./auth/authReducer";
const rootReducer = combineReducers({
  login: login,
});

export default rootReducer;
