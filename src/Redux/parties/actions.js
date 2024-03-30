import { USER_DETAILS } from "../business/actionTypes";
import {
  FETCH_PARTIES_LOADING,
  FETCH_PARTIES_ERROR,
  FETCH_PARTIES_SUCCESS,
  SAVE_PARTY_LOADING,
  SAVE_PARTY_ERROR,
  SAVE_PARTY_SUCCESS,
  LOADING_GET_CURRENT_PARTY,
  ERROR_GET_CURRENT_PARTY,
  SUCCESS_GET_CURRENT_PARTY,
  LOADING_DELETE_PARTY,
  ERROR_DELETE_PARTY,
  SUCCESS_DELETE_PARTY,
  EDIT_PARTY_LOADING,
  EDIT_PARTY_ERROR,
  SUCCESS_EDIT_PARTY,
} from "./actionTypes";

import axios from "axios";

const API_URL = "https://asaanly.in";

// ----------------------- Fetch All Parties Data Function ---- Didn't applied function curring due to thunk error in store.js
export const FetchAllParties = async (dispatch) => {
  dispatch({ type: FETCH_PARTIES_LOADING });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
  try {
    const response = await axios.get(`${API_URL}/${FirmId}/party/getAllData`, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });

    console.log("Fetch All Parties Response", response?.data);
    dispatch({ type: FETCH_PARTIES_SUCCESS, payload: response?.data?.data });
  } catch (error) {
    dispatch({ type: FETCH_PARTIES_ERROR });
    console.error("Error Fetching Parties Data:", error);
  }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const SaveParty = async (dispatch, data, CloseForm, toast) => {
  toast.closeAll();
  dispatch({ type: SAVE_PARTY_LOADING });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
  // console.log(("data party:-",data))
  try {
    // prettier-ignore
    const response = await axios.post(`${API_URL}/${FirmId}/party`, data, { // eslint-disable-line no-unused-vars
       headers: {
         Authorization: `Bearer ${token} `,
       },
     });
    // console.log("Save Party Response:", response?.data);
    dispatch({ type: SAVE_PARTY_SUCCESS });
    toast({
      title: "Party Successfully Added!",
      status: "success",
      position: "top",
    });
    CloseForm(false);
  } catch (error) {
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: SAVE_PARTY_ERROR });
    console.log("Saving Party Error Response:", error);
  }
};

// Updating Party Request *********************************************************
export const UpdateParty = async (
  dispatch,
  partyId,
  updatedPartyData,
  setShowEditFirm,
  toast
) => {
  toast.closeAll();
  dispatch({ type: EDIT_PARTY_LOADING });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.patch(
      `${API_URL}/${FirmId}/party/update/${partyId}`,
      updatedPartyData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Update Party Response:", response.data);
    dispatch({
      type: SUCCESS_GET_CURRENT_PARTY,
      payload: response.data,
    });
    dispatch({ type: SUCCESS_EDIT_PARTY });
    toast({
      title: "Party Updated",
      status: "success",
      position: "top",
    });
    setShowEditFirm(false);
  } catch (error) {
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: EDIT_PARTY_ERROR });
    console.error("Error Updating Party:", error);
  }
};

// Delete Party Request ************************
export const DeleteParty = async (
  dispatch,
  partyId,
  setShowEditFirm,
  toast
) => {
  toast.closeAll();
  dispatch({ type: LOADING_DELETE_PARTY });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.delete(
      `${API_URL}/${FirmId}/party/delete/${partyId}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    console.log("Delete Party Response:", response?.data);
    dispatch({ type: SUCCESS_DELETE_PARTY });
    setShowEditFirm(false);
    toast({
      title: "Party Deleted",
      status: "success",
      position: "top",
    });
  } catch (error) {
    dispatch({ type: ERROR_DELETE_PARTY });
    console.log("Deleting Party Error:", error);
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
  }
};

// Get Current Party Data *********************************************************
export const GetCurrentPartyData = (partyId) => async (dispatch) => {
  dispatch({ type: LOADING_GET_CURRENT_PARTY });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(`${API_URL}/${FirmId}/party/${partyId}`, {
      headers: { Authorization: `Bearer ${token} ` },
    });
    console.log("Get Current Party Data Response", response?.data?.data);
    dispatch({
      type: SUCCESS_GET_CURRENT_PARTY,
      payload: response?.data?.data,
    });
  } catch (error) {
    dispatch({ type: ERROR_GET_CURRENT_PARTY });
    console.error("Error Getting Current Party Data:", error);
  }
};
