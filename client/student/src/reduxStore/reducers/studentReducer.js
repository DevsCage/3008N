import { studentConstants } from "../constants/studentConstants";
const initState = {
  message: null,
  studentData: null,
  forgotPasswordLoading: false,
};

const studentReducer = (state = initState, action) => {
  switch (action.type) {
    case studentConstants.VIEW_STUDENT_REQUEST:
      state = {
        ...state,
        forgotPasswordLoading: true,
      };
      break;
    case studentConstants.VIEW_STUDENT_SUCCESS:
      state = {
        ...state,
        studentData: action.payload,
        forgotPasswordLoading: false,
      };
      break;
    case studentConstants.VIEW_STUDENT_FAILRURE:
      state = {
        ...state,
        errorMessage: action.payload,
        studentData: null,
        forgotPasswordLoading: false,
      };
      break;
  }
  return state;
};

export default studentReducer;
