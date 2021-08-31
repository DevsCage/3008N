import axios from "axios";
import { marksCardContants } from "../constants/marksCardConstants";

export const getMarksCard = (data) => {
  return async (dispatch) => {
    dispatch({ type: marksCardContants.SEM_CARD_REQ });
    const res = await axios
      .post("http://localhost:5000/api/get-marks-students", {
        ...data,
      })
      .then((res) => {
        console.log(res.data);
        const studentCard = res.data;

        dispatch({
          type: marksCardContants.SEM_CARD_SUCCESS,
          payload: studentCard,
        });
      })
      .catch((error) => {
        const message = error.response.data;
        console.log(message);
        dispatch({
          type: marksCardContants.SEM_CARD_FAILURE,
          payload: {
            message,
          },
        });
      });
  };
};
