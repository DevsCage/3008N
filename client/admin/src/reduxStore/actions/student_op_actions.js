import axios from "axios";
import { authConstants } from "../constants/constants";
import { feeConstants } from "../constants/constants";
import { studentsConstants } from "../constants/constants";
export const addStudent = (student_data) => {
  return async (dispatch) => {
    console.log("---", student_data);
    dispatch({ type: authConstants.ADD_STUDENT });

    const res = await axios
      .post("http://localhost:5000/api/students/create", student_data, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: authConstants.ADD_STUDENT_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: authConstants.ADD_STUDENT_FAILURE,
          payload: err.response.data.message,
        });
      });
  };
};

// Get Students filtered by Year, Branch, Sem
export const getStudents = (data) => {
  return async (dispatch) => {
    dispatch({
      type: studentsConstants.VIEW_STUDENT_REQUEST,
    });

    const res = await axios
      .post(
        "http://localhost:5000/api/get-students",
        {
          ...data,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 201) {
          dispatch({
            type: studentsConstants.VIEW_STUDENT_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((error) => {
        const message = error.response.data;
        console.log(message);
        dispatch({
          type: studentsConstants.VIEW_STUDENT_FAILRURE,
          payload: {
            message,
          },
        });
      });
  };
};

/*  SHIFT THIS TO NEW FILE NAMED FEE-ACTIONS.JS*/
export const addFee = (data) => {
  return async (dispatch) => {
    dispatch({
      type: feeConstants.ADD_FEE_REQUEST,
    });

    const res = await axios
      .post(
        "http://localhost:5000/api/add-fee",
        {
          ...data,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 201) {
          const add_fee_response_data = res.data;
          dispatch({
            type: feeConstants.ADD_FEE_SUCCESS,
            payload: add_fee_response_data,
          });
        }
      })
      .catch((error) => {
        const message = error.response.data.message;
        console.log(message);
        dispatch({
          type: feeConstants.ADD_FEE_FAILURE,
          payload: message,
        });
      });
  };
};

export const updateFee = (data) => {
  return async (dispatch) => {
    dispatch(
      {
        type: feeConstants.UPDATE_FEE_REQUEST,
      },
      { withCredentials: true }
    );

    const res = await axios
      .post("http://localhost:5000/api/update-fee", data)
      .then((res) => {
        console.log(res);
        const add_fee_response_data = res.data;
        dispatch({
          type: feeConstants.UPDATE_FEE_SUCCESS,
          payload: add_fee_response_data,
        });
      })
      .catch((error) => {
        const message = error.response.data.message;

        dispatch({
          type: feeConstants.UPDATE_FEE_FAILURE,
          payload: message,
        });
      });
  };
};
