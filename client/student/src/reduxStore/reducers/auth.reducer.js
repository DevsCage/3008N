import { authConstants } from "../constants/constants";

const initState = {
  isAuthenticated: false,
  authenticating: false,
  user: null,
  token: null,
  USN: null,
  error: null,
  loading: false,
  errror: null,
  message: "",
  isSignedUp: false,
  signingUp: false,
};

const authReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        loading: true,
        message: "",
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        USN: action.payload.student,
        authenticating: false,
        isAuthenticated: true,
        loading: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
        authenticating: false,
        isAuthenticated: false,
      };
      break;

    case authConstants.SIGNUP_REQUEST:
      state = {
        ...state,
        signingUp: true,
        loading: true,
      };
      break;
    case authConstants.SIGNUP_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        signingUp: false,
        isSignedUp: true,
        loading: false,
      };
      break;
  }
  return state;
};

export default authReducer;
