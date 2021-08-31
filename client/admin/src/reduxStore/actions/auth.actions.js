import axios from "axios";
import { authConstants } from "../constants/constants";

export const login = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    await axios
      .post(
        "http://localhost:5000/api/admin/signin",
        {
          ...user,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        console.log(res.data);
        const { token, user } = res.data;

        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: err.response.data.message,
        });
      });
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    await axios
      .post(
        "http://localhost:5000/api/logout",
        {},
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        dispatch({ type: authConstants.LOGOUT_SUCCESS });
        console.log(res.data);
      })
      .catch((err) => {
        dispatch({ type: authConstants.LOGOUT_FAILURE });
        console.log(err);
      });
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
