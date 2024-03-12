import { USER_DETAILS } from "../business/actionTypes";
import {
  FETCH_PARTIES_LOADING,
  FETCH_PARTIES_ERROR,
  FETCH_PARTIES_SUCCESS,
  SAVE_PARTY_LOADING,
  SAVE_PARTY_ERROR,
  SAVE_PARTY_SUCCESS,
  PARTIES_PAYMENT_OUT_FAILURE,
  PARTIES_PAYMENT_OUT_REQUEST,
  PARTIES_PAYMENT_OUT_SUCCESS,
  PARTIES_PURCHASE_BILL_FAILURE,
  PARTIES_PURCHASE_BILL_REQUEST,
  PARTIES_PURCHASE_BILL_SUCCESS,
} from "./actionTypes";

import axios from "axios";

const API_URL = "https://ca-backend-api.onrender.com";
const token = localStorage.getItem("token");
const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

// ----------------------- Fetch All Parties Data Function ---- Didn't applied function curring due to thunk error in store.js
export const FetchAllParties = async (dispatch) => {
  dispatch({ type: FETCH_PARTIES_LOADING });

  try {
    const response = await axios.get(`${API_URL}/${FirmId}/party/getAll`, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });

    // console.log("Parties Data:", response?.data);
    dispatch({ type: FETCH_PARTIES_SUCCESS, payload: response?.data?.data });
  } catch (error) {
    console.error("Error Fetching Parties Data:", error);
    dispatch({ type: FETCH_PARTIES_ERROR });
  }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const SaveParty = async (dispatch, data, setPartyFormToggle, toast) => {
  toast.closeAll();
  dispatch({ type: SAVE_PARTY_LOADING });

  try {
    // prettier-ignore
    const response = await axios.post(`${API_URL}/${FirmId}/party`, data, { // eslint-disable-line no-unused-vars
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    // console.log("Save Party Response:", response?.data);
    dispatch({ type: SAVE_PARTY_SUCCESS });
    toast({ title: "Party Added", status: "success", position: "top" });
    setPartyFormToggle((prev) => !prev);
  } catch (error) {
    console.log("Saving Party Error Response:", error);
    toast({
      title: "Something Went Wrong",
      description: error?.response?.data,
      status: "error",
      position: "top",
    });
    dispatch({ type: SAVE_PARTY_ERROR });
  }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const GetCurrentPartyData = async (
  dispatch,
  data,
  setPartyFormToggle
) => {
  dispatch({ type: SAVE_PARTY_LOADING });

  try {
    // prettier-ignore
    const response = await axios.post(`${API_URL}/${FirmId}/party`, data, { // eslint-disable-line no-unused-vars
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    // console.log("Save Party Response:", response?.data);

    dispatch({ type: SAVE_PARTY_SUCCESS });
    setPartyFormToggle((prev) => !prev);
    alert("Party Saved ✔️");
  } catch (error) {
    dispatch({ type: SAVE_PARTY_ERROR });
    console.log("Saving Party Error Response:", error);
    alert(error?.response?.data || "Something Went Wrong!");
  }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const GetAllGroups = async (dispatch, data, setPartyFormToggle) => {
  dispatch({ type: SAVE_PARTY_LOADING });

  // This request needs to be edited

  try {
    const response = await axios.post(
      `https://ca-backend-api.onrender.com/${FirmId}/party`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    console.log("Getting All Groups Response:", response?.data);

    dispatch({ type: SAVE_PARTY_SUCCESS });
    setPartyFormToggle((prev) => !prev);
    // alert("Party Saved ✔️");
  } catch (error) {
    dispatch({ type: SAVE_PARTY_ERROR });
    console.log("Getting All Groups Response:", error);
    alert(error?.response?.data || "Something Went Wrong!");
  }
};

