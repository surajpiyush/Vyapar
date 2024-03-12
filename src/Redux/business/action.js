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

// Company Register Request ---- Didn't applied function curring due to thunk error in store.js
export const FetchAllCompanies = async (dispatch) => {
  dispatch({ type: ISLOADING });
  const token = localStorage.getItem("token");

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
  toast,
  navigate,
  location,
  setFormdata
) => {
  toast.closeAll();
  dispatch({ type: ISLOADING });
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(`${API_URL}/firm_registration`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Business Added Response", response?.data);
    let newCurrentCompanyData = response?.data?.FirmData;
    localStorage.setItem(USER_DETAILS, JSON.stringify(newCurrentCompanyData));
    dispatch({ type: SUCCESS });
    setFormdata({
      companyName: "",
      email: "",
      phoneNumber: "",
    });
    toast({
      title: "Business Added ✔️",
      status: "success",
      position: "top",
    });
    navigate("/", {
      state: { redirectTo: location.pathname },
      replace: true,
    });
  } catch (error) {
    dispatch({ type: ISERROR });
    toast({
      title: error?.response?.data?.message || "Something Went Wrong!",
      status: "success",
      position: "top",
    });
    console.log("Error Adding New Business:", error);
  }
};

// Update Company Profile ---- Didn't applied function curring due to thunk error in store.js
export const UpdateCompanyProfile = async (dispatch, data, toast) => {
  dispatch({ type: ISLOADING });
  toast.closeAll();
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
  try {
    // prettier-ignore
    const response = await axios.put( // eslint-disable-line no-unused-vars
      `${API_URL}/firm_registration/${FirmId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log("Update Firm Response", response?.data);
    const responseData = response?.data?.FirmData;
    const prevousUserLSData = JSON.parse(localStorage.getItem(USER_DETAILS));
    const newUserLSData = {
      ...prevousUserLSData,
      ...data,
      ...responseData,
    };
    // console.log("newUserLSData", newUserLSData);
    localStorage.setItem(USER_DETAILS, JSON.stringify(newUserLSData));
    dispatch({ type: UPDATE_PROFILE_SUCCESS });
    toast({
      title: "Company Profile Updated",
      position: "top",
      status: "success",
    });
  } catch (error) {
    dispatch({ type: ISERROR });
    toast({
      title: error?.response?.data?.message || "Something Went Wrong!",
      position: "top",
      status: "error",
    });
    console.log("Updating Profile Error Response:", error);
  }
};
