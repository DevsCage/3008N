import { feeConstants } from "../constants/constants";

const initState = {
  message: "",
};

const feeReducer = (state = initState, action) => {
  switch (action.type) {
    case feeConstants.ADD_FEE:
      state = {
        message: "Fee Addition is Requested",
      };
      break;
    case feeConstants.ADD_FEE_SUCCESS:
      state = {
        message: "Fee Addition is Successful",
      };
      break;
    case feeConstants.ADD_FEE_FAILURE:
      state = {
        message: action.payload,
      };
      break;
    case feeConstants.UPDATE_FEE_REQUEST:
      state = {
        message: "Fee Update Request",
      };
      break;
    case feeConstants.UPDATE_FEE_SUCCESS:
      state = {
        message: "Fee Updation Successfull",
      };
      break;
    case feeConstants.UPDATE_FEE_FAILURE:
      state = {
        message: action.payload,
      };
  }
  return state;
};
export default feeReducer;
