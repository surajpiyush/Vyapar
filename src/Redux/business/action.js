import {
  ISLOADING,
  ISERROR,
  SUCCESS,
  USER_DETAILS,
  UPDATE_PROFILE_SUCCESS,
  FETCH_COMPANIES_SUCCESS,
} from "./actionTypes";

import axios from "axios";

const API_URL = `https://ca-backend-api.onrender.com`;
const token = localStorage.getItem("token");

// Company Register Request ---- Didn't applied function curring due to thunk error in store.js
export const FetchAllCompanies = async (dispatch) => {
  dispatch({ type: ISLOADING });

  try {
    const response = await axios.get(`${API_URL}/firm_registration`, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    // console.log("Fetching All Companies Response:", response?.data);
    dispatch({
      type: FETCH_COMPANIES_SUCCESS,
      payload: response?.data?.data,
    });
  } catch (error) {
    dispatch({ type: ISERROR });
    console.log("Fetching All Companies Error Response:", error);
    // alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};

// New Company Add Request ---- Didn't applied function curring due to thunk error in store.js
export const AddBusinessLoginRequest = async (
  dispatch,
  data,
  navigate,
  location,
  setFormdata
) => {
  dispatch({ type: ISLOADING });

  try {
    const response = await axios.post(`${API_URL}/firm_registration`, data, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    console.log("Business Added", response?.data);
    let newCurrentCompanyData = response?.data?.FirmData;
    localStorage.setItem(USER_DETAILS, JSON.stringify(newCurrentCompanyData));
    dispatch({ type: SUCCESS });
    setFormdata({
      companyName: "",
      email: "",
      phoneNumber: "",
    });
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
  try {
    // prettier-ignore
    const response = await axios.put( // eslint-disable-line no-unused-vars
      `${API_URL}/firm_registration/${firmId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const prevousUserLSData = JSON.parse(localStorage.getItem(USER_DETAILS));
    const newUserLSData = {
      ...prevousUserLSData,
      ...data,
    };
    // console.log("newUserLSData", newUserLSData);
    localStorage.setItem(USER_DETAILS, JSON.stringify(newUserLSData));
    // console.log("response", response.data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS });
    alert("Profile Updated Successfully ✔️");
  } catch (error) {
    dispatch({ type: ISERROR });
    console.log("Updating Profile Error Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};
