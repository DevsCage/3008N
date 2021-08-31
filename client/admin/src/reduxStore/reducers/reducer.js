import { combineReducers } from "redux";
import changeState from "../reducers/sidebar.reducer";
import authReducer from "../reducers/auth.reducer";
import feeReducer from "../reducers/fee.Reducer";
import studentReducer from "../reducers/student.Reducer";

const rootReducer = combineReducers({
  sidebar: changeState,
  auth: authReducer,
  feeReducer: feeReducer,
  studentReducer: studentReducer,
});

export default rootReducer;
