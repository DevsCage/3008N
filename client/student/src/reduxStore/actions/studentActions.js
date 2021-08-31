import axios from "axios";

import { studentConstants } from "../constants/studentConstants";

export const getStudents = (USN) => {
  return async (dispatch) => {
    dispatch({
      type: studentConstants.VIEW_STUDENT_REQUEST,
    });
    console.log(USN, "USN in redux");
    const res = await axios
      .post("http://localhost:5000/api/get-student-by-USN", { USN })
      .then((res) => {
        dispatch({
          type: studentConstants.VIEW_STUDENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error) => {
        const message = error.response.data;
        console.log(message);
        dispatch({
          type: studentConstants.VIEW_STUDENT_FAILRURE,
          payload: {
            message,
          },
        });
      });
  };
};
