import {
  ISLOADING,
  ISERROR,
  SUCCESS,
  USER_DETAILS,
  UPDATE_PROFILE_SUCCESS,
  FETCH_COMPANIES_SUCCESS,
} from "./actionTypes";

import axios from "axios";

// Company Register Request ---- Didn't applied function curring due to thunk error in store.js
export const FetchAllCompanies = async (dispatch) => {
  dispatch({ type: ISLOADING });
  // const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MDc1NDk0NDEsImV4cCI6MTcwNzYzNTg0MX0.fAxYV41o_71t6FWieQ3zonPm5spdQnw6gi4PSJ778rs";

  try {
    const response = await axios.get(
      `https://ca-backend-api.onrender.com/firm_registration`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    console.log("Fetching All Companies Response:", response?.data);

    dispatch({ type: FETCH_COMPANIES_SUCCESS, payload: response?.data?.data });
  } catch (error) {
    dispatch({ type: ISERROR });
    console.log("Fetching All Companies Error Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};

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
    const response = await axios.post(
      "https://ca-backend-api.onrender.com/companyRegister/auth/signin",
      data
    );

    const { name, companyName, email, userId, token, phoneNumber } =
      response?.data?.result;
    localStorage.setItem(
      USER_DETAILS,
      JSON.stringify({ name, companyName, email, userId, token, phoneNumber })
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

// Update Company Profile ---- Didn't applied function curring due to thunk error in store.js
export const UpdateCompanyProfile = async (dispatch, data) => {
  dispatch({ type: ISLOADING });
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `https://ca-backend-api.onrender.com/firm_registration/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    console.log("Profile Update Response:", response?.data);

    dispatch({ type: UPDATE_PROFILE_SUCCESS });
    alert("Profile Added Successfully ✔️");
  } catch (error) {
    dispatch({ type: ISERROR });
    console.log("Updating Profile Error Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};
