import { paymentLogConstants } from "../constants/paymentLogConstants";

const initialState = {
  messgae: "",
  data: null,
  verifiedStatus: false,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case paymentLogConstants.UV_LOG_REQUEST:
      state = {
        ...state,
      };
      break;
    case paymentLogConstants.UV_LOG_SUCCESS:
      state = {
        ...state,
        data: action.payload,
      };
      break;
    case paymentLogConstants.UV_LOG_FAILURE:
      state = {
        data: null,
        message: action.payload,
      };
      break;
    case paymentLogConstants.V_LOG_REQUEST:
      state = {
        ...state,
      };
      break;
    case paymentLogConstants.V_LOG_SUCCESS:
      state = {
        ...state,
        data: action.payload,
      };
      break;
    case paymentLogConstants.V_LOG_FAILURE:
      state = {
        data: null,
        message: action.payload,
      };
      break;

    case paymentLogConstants.VERIFY_LOG_REQUEST:
      state = {
        ...state,
        verifiedStatus: false,
      };
      break;

    case paymentLogConstants.VERIFY_LOG_SUCCESS:
      console.log(state);
      state = {
        ...state,
        verifiedStatus: true,
      };
      console.log(state);
      break;

    case paymentLogConstants.VERIFY_LOG_FAILURE:
      state = {
        data: null,
        message: action.payload,
        verifiedStatus: false,
      };
      break;
  }
  return state;
};
