import { combineReducers } from "redux";
import changeState from "../reducers/sidebar.reducer";
import authReducer from "../reducers/auth.reducer";
import marksCardReducer from "./marksCard.reducer";
import studentReducer from "../reducers/studentReducer";
const rootReducer = combineReducers({
  sidebar: changeState,
  auth: authReducer,
  marksCard: marksCardReducer,
  student: studentReducer,
});

export default rootReducer;
