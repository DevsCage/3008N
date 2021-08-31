import axios from "axios";
import { authConstants } from "../constants/constants";

export const login = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios
      .post("http://localhost:5000/api/signin", {
        ...user,
      })
      .then((res) => {
        console.log(res);
        const { token, user } = res.data;
        const student_ref_id = user.student_ref_id;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);

        console.log(student_ref_id, "fuc");
        axios
          .post("http://localhost:5000/api/get-student-by-ID", {
            student_ref_id,
          })
          .then((result) => {
            const { student } = result.data;
            console.log("student from then block", student);
            localStorage.setItem("student", JSON.stringify(student));
            dispatch({
              type: authConstants.LOGIN_SUCCESS,
              payload: {
                token,
                user,
                student,
              },
            });
          })
          .catch((err) => {
            console.log(err.response.data.message);
            // RETRY LOGIN
          });
      })
      .catch((err) => {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            message: err.response.data.message,
          },
        });
      });
    // console.log("-----------------------------------", res);
    // if (res.status === 200) {
    //   const { token, user } = res.data;
    //   localStorage.setItem("token", token);

    //   dispatch({
    //     type: authConstants.LOGIN_SUCCESS,
    //     payload: {
    //       token,
    //       user,
    //     },
    //   });
    // } else {
    //   if (res.status === 400) {
    //     const { message, error } = res.data;

    //     dispatch({
    //       type: authConstants.LOGIN_FAILURE,
    //       payload: {
    //         message,
    //         error,
    //       },
    //     });
    //   }
    // }
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
