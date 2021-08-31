import axios from "axios";

import { authConstants } from "../constants/constants";

export const addStaff = (staff_data) => {
  console.log(staff_data);
  return async (dispatch) => {
    //dispatch({ type: authConstants.ADD_STAFF });
    const res = await axios.post("http://localhost:5000/api/newstaff");
    if (res.status === 200) {
      const { staff_data } = res.data;
    } else if (res.status === 400) {
      const { message, error } = res.data;
    }
  };
};
