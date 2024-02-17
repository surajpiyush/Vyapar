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
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `https://ca-backend-api.onrender.com/firm_registration`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    // console.log("Fetching All Companies Response:", response?.data);

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
  try {
    const response = await axios.post(
      "https://ca-backend-api.onrender.com/companyRegister/auth/signup",
      data
    );
    //  console.log("Business Added", response?.data);
    const previousUserLSData = localStorage.getItem(USER_DETAILS);
    const newUserLSData = {
      ...previousUserLSData,
      ...response?.data?.companyData,
    };
    localStorage.setItem(USER_DETAILS, JSON.stringify(newUserLSData));
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
export const UpdateCompanyProfile = async (dispatch, firmId, data) => {
  dispatch({ type: ISLOADING });
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `https://ca-backend-api.onrender.com/firm_registration/${firmId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    const prevousUserLSData = JSON.parse(localStorage.getItem(USER_DETAILS));
    const newUserLSData = {
      ...prevousUserLSData,
      ...data,
      _id: data.firmId,
    };
    localStorage.setItem(USER_DETAILS, JSON.stringify(newUserLSData));
    dispatch({ type: UPDATE_PROFILE_SUCCESS });
    alert("Profile Updated Successfully ✔️");
  } catch (error) {
    dispatch({ type: ISERROR });
    console.log("Updating Profile Error Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};
