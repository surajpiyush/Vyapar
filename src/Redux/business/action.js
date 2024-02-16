import { ISLOADING, ISERROR, SUCCESS, USER_DETAILS } from "./actionTypes";

import axios from "axios";

const ApiUrl =
  "https://ca-backend-api.onrender.com/companyRegister/auth/signin";

// Company Register Request ---- Didn't applied function curring due to thunk error in store.js
export const SendRegisterRequest = async (
  dispatch,
  data,
  navigate,
  location
) => {
  dispatch({ type: ISLOADING });
  localStorage.removeItem(USER_DETAILS);
  try {
    const response = await axios.post(ApiUrl, data);
    // console.log("Business Route Response:", response?.data);
    const { name, companyName, email, userId, token } = response?.data?.result;
    localStorage.setItem(
      USER_DETAILS,
      JSON.stringify({ name, companyName, email, userId, token })
    );
    dispatch({ type: SUCCESS });
    alert("Business Added ✔️");
    navigate("/", {
      state: { redirectTo: location.pathname },
      replace: true,
    });
  } catch (error) {
    dispatch({ type: ISERROR });
    console.log("Business Route Error Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};
