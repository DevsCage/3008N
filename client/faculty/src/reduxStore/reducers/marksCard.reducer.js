import { marskCardConstants } from "../constants/marksCardConstants";

const initState = {
  semCard: null,
  errorMessage: null,
};

const marksCardReducer = (state = initState, action) => {
  switch (action.type) {
    case marskCardConstants.FETCH_MARKS_REQUEST:
      state = {
        ...state,
      };
      break;
    case marskCardConstants.FETCH_MARKS_SUCCESS:
      state = {
        ...state,
        semCard: action.payload,
        errorMessage: null,
      };
      break;
    case marskCardConstants.FETCH_MARKS_FAILURE:
      state = {
        ...state,
        errorMessage: action.payload,
        semCard: null,
      };
      break;
  }
  return state;
};

export default marksCardReducer;
