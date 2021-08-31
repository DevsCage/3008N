import axios from "axios";

import { ExamFeeConstants } from "../constants/examFeeConstants";

export const addExamFee = (studentsData, examFeeData) => {
  console.log(studentsData);
  console.log(examFeeData);
  return async (dispatch) => {
    dispatch({ type: ExamFeeConstants.EXAM_FEE_REQUEST });

    const res = await axios
      .post(
        "http://localhost:5000/api/add-exam-fee",
        { studentsData, examFeeData },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch({
          type: ExamFeeConstants.EXAM_FEE_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: ExamFeeConstants.EXAM_FEE_FAILURE,
          payload: err.response.data.message,
        });
      });
  };
};
