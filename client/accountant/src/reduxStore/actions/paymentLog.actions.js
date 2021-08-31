import axios from "axios";
import { paymentLogConstants } from "../constants/paymentLogConstants";

export const paymentLogUVFetchRequest = () => {
  return async (dispatch) => {
    dispatch({ type: paymentLogConstants.UV_LOG_REQUEST });

    const res = await axios
      .get("http://localhost:5000/api/get-uv-payment-log")
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: paymentLogConstants.UV_LOG_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: paymentLogConstants.UV_LOG_FAILURE,
          payload: err.response.data.message,
        });
      });
  };
};

export const paymentLogVFetchRequest = () => {
  return async (dispatch) => {
    dispatch({ type: paymentLogConstants.V_LOG_REQUEST });

    const res = await axios
      .get("http://localhost:5000/api/get-v-payment-log")
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: paymentLogConstants.V_LOG_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: paymentLogConstants.V_LOG_FAILURE,
          payload: err.response.data.message,
        });
      });
  };
};

export const verifyPaymentLog = (paymentLogDocID, paymentLogSubDocID) => {
  return async (dispatch) => {
    dispatch({
      type: paymentLogConstants.VERIFY_LOG_REQUEST,
    });

    await axios
      .post("http://localhost:5000/api/accept-payment-log", {
        paymentLogDocID,
        paymentLogSubDocID,
      })
      .then((res) => {
        dispatch({
          type: paymentLogConstants.VERIFY_LOG_SUCCESS,
          payload: res.data,
        });
        console.log(res.data);
      })
      .catch((err) => {
        dispatch({
          type: paymentLogConstants.VERIFY_LOG_FAILURE,
          payload: err.response.data.message,
        });
        console.log(err);
      });
  };
};
