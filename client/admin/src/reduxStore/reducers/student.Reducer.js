import { authConstants } from "../constants/constants";
import { studentsConstants } from "../constants/constants";
const initState = {
  message: null,
  studentData: null,
};

const studentReducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.ADD_STUDENT:
      state = {
        message: "Requested",
      };
      break;
    case authConstants.ADD_STUDENT_SUCCESS:
      state = {
        ...state,
      };
      break;
    case authConstants.ADD_STUDENT_FAILURE:
      state = {
        message: action.payload,
      };
      break;
    case studentsConstants.VIEW_STUDENT_REQUEST:
      state = {
        ...state,
      };
      break;
    case studentsConstants.VIEW_STUDENT_SUCCESS:
      state = {
        ...state,
        studentData: action.payload,
      };
      break;
    case studentsConstants.VIEW_STUDENT_FAILRURE:
      state = {
        ...state,
        errorMessage: action.payload,
        studentData: null,
      };
      break;
  }
  return state;
};

export default studentReducer;
