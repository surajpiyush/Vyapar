import { API_URL, USER_DETAILS } from "../store";
import {
  ISLOADING,
  ISERROR,
  SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  FETCH_COMPANIES_SUCCESS,
  DELETE_FIRM_SUCCESS,
  DELETE_FIRM_ERROR,
  DELETE_FIRM_LOADING,
} from "./actionTypes";
import { REGULAR_PRINTER_DATA, THERMAL_PRINTER_DATA } from "../store";

import axios from "axios";
import { toast } from "react-toastify";

// Company Register Request
export const FetchAllCompanies = async (dispatch) => {
  dispatch({ type: ISLOADING });
  const token = localStorage.getItem("token");
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MTI3NDE2NTAsImV4cCI6MTcxMjgyODA1MH0.ez_9ADGx3uKF1ivIFnKn7E2tm1zC9f0oixDtaT-jv-o";

  try {
    const response = await axios.get(`${API_URL}/firm_registration`, {
      headers: { Authorization: `Bearer ${token} ` },
    });

    // console.log("Fetching All Companies Response:", response?.data);
    dispatch({
      type: FETCH_COMPANIES_SUCCESS,
      payload: response?.data?.data,
    });
  } catch (error) {
    console.log("Fetching All Companies Error Response:", error);
    dispatch({ type: ISERROR });
    toast.dismiss();
    if (error?.response?.data?.tokenExpired) {
      return toast.warning("Session expired. Please log in again.");
    }
  }
};

// Add New Company
export const AddBusinessLoginRequest = async (
  dispatch,
  data,
  setFormdata,
  navigate
) => {
  toast.dismiss();
  dispatch({ type: ISLOADING });
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(`${API_URL}/firm_registration`, data, {
      headers: { Authorization: `Bearer ${token}` },
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
    toast.success("New business added.");
    navigate("/");
  } catch (error) {
    console.log("Error Adding New Business:", error);
    dispatch({ type: ISERROR });
    if (error?.response?.data?.tokenExpired) {
      return toast.warning("Session expired. Please log in again.");
    }
    toast.error("Failed to save your new business.");
  }
};

// Update Company Profile ---- Didn't applied function curring due to thunk error in store.js
export const UpdateCompanyProfile = async (dispatch, data, setShowEditFirm) => {
  toast.dismiss();
  dispatch({ type: ISLOADING });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.put(
      `${API_URL}/firm_registration/${FirmId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    //  console.log("Update Firm Response", response?.data);
    toast.success("Changes saved successfully.");
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
    setShowEditFirm(false);
  } catch (error) {
    console.log("Error Updating Profile:", error);
    dispatch({ type: ISERROR });
    if (error?.response?.data?.tokenExpired) {
      return toast.warning("Session expired. Please log in again.");
    }
    toast.error("Error occurred while updating profile.");
  }
};

// Delete Firm
export const DeleteCompany = async (dispatch, firmId) => {
  toast.dismiss();
  dispatch({ type: DELETE_FIRM_LOADING });
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${API_URL}/firm_registration/${firmId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log("Delete Firm Response:", response);
    dispatch({ type: DELETE_FIRM_SUCCESS });
    toast.success("Business successfully removed.");
  } catch (error) {
    console.log("Error Deleting Firm:", error);
    dispatch({ type: DELETE_FIRM_ERROR });
    if (error?.response?.data?.tokenExpired) {
      return toast.warning("Session expired. Please log in again.");
    }
    toast.error("Failed to remove your business.");
  }
};

// Logout Function
export const LOGOUT = (navigate, showToast = false) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem(USER_DETAILS);
  sessionStorage.removeItem(REGULAR_PRINTER_DATA);
  sessionStorage.removeItem(THERMAL_PRINTER_DATA);
  if (showToast) {
    toast.dismiss();
    toast.success("You've been logged out.");
  }
  navigate("/auth");
};
