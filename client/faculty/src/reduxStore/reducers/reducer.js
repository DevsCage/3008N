import { combineReducers } from "redux";
import changeState from "../reducers/sidebar.reducer";
import authReducer from "../reducers/auth.reducer";
import marksCardReducer from "./marksCard.reducer";
const rootReducer = combineReducers({
  sidebar: changeState,
  auth: authReducer,
  marksCard: marksCardReducer,
});

export default rootReducer;
