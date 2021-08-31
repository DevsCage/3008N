import axios from "axios";
import { authConstants } from "../constants/constants";

export const login = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post("http://localhost:5000/api/signin", {
      ...user,
    });
    // .then(res => {
    //         const { token, user } = res.data
    //         dispatch({
    //             type: authConstants.LOGIN_SUCCESS,
    //             payload: {
    //                 token,
    //                 user
    //             }
    //         })
    //     })
    //     .catch(err => {
    //         dispatch({
    //             type: authConstants.LOGIN_FAILURE,
    //             payload: {
    //                 message: err.message
    //             }
    //         })
    //     })
    console.log("-----------------------------------", res);
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);

      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        const { message, error } = res.data;

        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            message,
            error,
          },
        });
      }
    }
  };
};

export const signup = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: authConstants.SIGNUP_REQUEST });
    const res = await axios.post("http://localhost:5000/api/signup", {
      ...user,
    });

    if (res.status === 201) {
      const { message } = res.data;

      dispatch({
        type: authConstants.SIGNUP_SUCCESS,
        payload: {
          message,
        },
      });
    }
  };
};
