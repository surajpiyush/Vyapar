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

// Company Register Request ---- Didn't applied function curring due to thunk error in store.js
export const FetchAllCompanies = async (dispatch, toast) => {
  dispatch({ type: ISLOADING });
  toast.closeAll();
  const token = localStorage.getItem("token");

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
    dispatch({ type: ISERROR });
    toast({
      title:
        error?.response?.data?.message ||
        error?.response?.data?.msg ||
        "Something Went Wrong!",
      status: "warning",
    });
    console.log("Fetching All Companies Error Response:", error);
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
    toast({
      title: "Business Added ✔️",
      status: "success",
      position: "top",
    });
    navigate("/");
  } catch (error) {
    dispatch({ type: ISERROR });
    toast({
      title:
        error?.response?.data?.message ||
        error?.response?.data?.msg ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Error Adding New Business:", error);
  }
};

// Update Company Profile ---- Didn't applied function curring due to thunk error in store.js
export const UpdateCompanyProfile = async (
  dispatch,
  data,
  toast,
  setShowEditFirm
) => {
  // console.log("Sent Updated firm data", data);
  dispatch({ type: ISLOADING });
  toast.closeAll();
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
      title: "Profile Updated",
      position: "top",
      status: "success",
    });
    setShowEditFirm(false);
  } catch (error) {
    toast({
      title: "Something went wrong while updating profile!",
      description: error?.response?.data?.message || error?.response?.data?.msg,
      position: "top",
      status: "error",
    });
    dispatch({ type: ISERROR });
    console.log("Updating Profile Error Response:", error);
  }
};

export const DeleteCompany = async (dispatch, id, toast) => {
  dispatch({ type: DELETE_FIRM_LOADING });
  toast.closeAll();
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(`${API_URL}/firm_registration/${id}`, {
      headers: {
        Authorization: `Bearer ${token} `,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: DELETE_FIRM_SUCCESS });
    toast({
      title: "Company Deleted Successfully",
      position: "top",
      status: "success",
    });
    // console.log(response);
  } catch (error) {
    dispatch({ type: DELETE_FIRM_ERROR });
    toast({
      title:
        error?.response?.data?.message ||
        error?.response?.data?.msg ||
        "Something Went Wrong!",
      position: "top",
      status: "error",
    });
    console.log("error in deketeing :-", error);
  }
};

// Logout Function
export const LOGOUT = (navigate, toast) => {
  toast.closeAll();
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem(USER_DETAILS);
  sessionStorage.removeItem(REGULAR_PRINTER_DATA);
  sessionStorage.removeItem(THERMAL_PRINTER_DATA);
  toast({ title: "Logged Out!", status: "success" });
  navigate("/auth");
};
