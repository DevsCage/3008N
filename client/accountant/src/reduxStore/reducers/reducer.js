import { combineReducers } from "redux";
import changeState from "../reducers/sidebar.reducer";
import authReducer from "../reducers/auth.reducer";
import { paymentReducer } from "../reducers/paymentLogReducer";
const rootReducer = combineReducers({
  sidebar: changeState,
  auth: authReducer,
  paymentLog: paymentReducer,
});

export default rootReducer;
