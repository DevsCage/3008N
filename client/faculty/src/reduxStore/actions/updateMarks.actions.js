import axios from "axios";
import { marskCardConstants } from "../constants/marksCardConstants";

export const getMarksCardFaculty = (semister, student_id, IA) => {
  console.log(semister, student_id, IA);
  return async (dispatch) => {
    dispatch({ type: marskCardConstants.FETCH_MARKS_REQUEST });
    const res = await axios
      .post("http://localhost:5000/api/get-marks-faculty", {
        semister,
        student_id: student_id,
        IA_type: IA,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 201) {
          dispatch({
            type: marskCardConstants.FETCH_MARKS_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((error) => {
        const message = error.message;
        dispatch({
          type: marskCardConstants.FETCH_MARKS_FAILURE,
          payload: {
            message,
          },
        });
      });
  };
};

export const updateMarksFaculty = (data) => {
  console.log(data, "fuck u inside redux ");

  return async (dispatch) => {
    dispatch({ type: marskCardConstants.FETCH_MARKS_REQUEST });
    const res = await axios
      .post("http://localhost:5000/api/update-markscard", { ...data })
      .then((res) => {
        console.log(res.data);
        if (res.status === 201) {
          dispatch({
            type: marskCardConstants.FETCH_MARKS_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((error) => {
        const message = error.message;
        dispatch({
          type: marskCardConstants.FETCH_MARKS_FAILURE,
          payload: {
            message,
          },
        });
      });
  };
};
