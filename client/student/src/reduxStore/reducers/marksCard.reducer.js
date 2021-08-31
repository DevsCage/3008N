import { marksCardContants } from "../constants/marksCardConstants";

const initState = {
  studentCard: null,
  errorMessage: null,
};

const marksCardReducer = (state = initState, action) => {
  switch (action.type) {
    case marksCardContants.SEM_CARD_REQ:
      state = {
        ...state,
      };
      break;
    case marksCardContants.SEM_CARD_SUCCESS:
      state = {
        ...state,
        studentCard: action.payload,
        errorMessage: null,
      };
      break;
    case marksCardContants.SEM_CARD_FAILURE:
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
