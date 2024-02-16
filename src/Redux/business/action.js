import { ISLOADING, ISERROR, SUCCESS } from "./actionTypes";

import axios from "axios";

const ApiUrl =
  "https://ca-backend-api.onrender.com/companyRegister/auth/signin";

// Company Register Request ---- Didn't applied function curring due to thunk error in store.js
export const SendRegisterRequest = async (dispatch, data) => {
  dispatch({ type: ISLOADING });
  try {
    const response = await axios.post(ApiUrl, data);
    // console.log("Business Route Response:", response?.data);

    const { name, companyName, email, userId } = response?.data?.result;
    dispatch({ type: SUCCESS, payload: { name, companyName, email, userId } });
    alert("Business Added ✔️");
  } catch (error) {
    dispatch({ type: ISERROR });
    console.log("Business Route Error Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};
