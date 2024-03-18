import { USER_DETAILS } from "../business/actionTypes";
import {
   FETCH_PARTIES_LOADING,
   FETCH_PARTIES_ERROR,
   FETCH_PARTIES_SUCCESS,
   SAVE_PARTY_LOADING,
   SAVE_PARTY_ERROR,
   SAVE_PARTY_SUCCESS,
   CURRENT_PARTIES_TRANSECATIONS_SUCCESS,
   PARTIES_EDIT_SUCCESS,
} from "./actionTypes";

import axios from "axios";

const API_URL = "https://asaanly.in";

// ----------------------- Fetch All Parties Data Function ---- Didn't applied function curring due to thunk error in store.js
export const FetchAllParties = async (dispatch) => {
   dispatch({ type: FETCH_PARTIES_LOADING });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
   try {
      const response = await axios.get(`${API_URL}/${FirmId}/party/getAll`, {
         headers: {
            Authorization: `Bearer ${token} `,
         },
      });

      // console.log("Fetch All Parties Response", response?.data);
      dispatch({ type: FETCH_PARTIES_SUCCESS, payload: response?.data?.data });
   } catch (error) {
      dispatch({ type: FETCH_PARTIES_ERROR });
      console.error("Error Fetching Parties Data:", error);
   }
};

export const getCurrentPartyData = (id) => async (dispatch) => {
   // dispatch({ type: FETCH_PARTIES_LOADING });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
   try {
      const response = await axios.get(`${API_URL}/${FirmId}/party/${id}`, {
         headers: {
            Authorization: `Bearer ${token} `,
         },
      });

      console.log("Fetch All Parties Response", response?.data);
      dispatch({
         type: CURRENT_PARTIES_TRANSECATIONS_SUCCESS,
         payload: response?.data?.data,
      });
   } catch (error) {
      dispatch({ type: FETCH_PARTIES_ERROR });
      console.error("Error Fetching Parties Data:", error);
   }
};

// updating the party
export const updateCurrentPartyData = (id, updatedData) => async (dispatch) => {
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?.id;
   // console.log(id,updatedData)
   try {
      const response = await axios.patch(
         `${API_URL}/${FirmId}/party/update/${id}`,
         updatedData,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );

      console.log("Updated Party Data:", response.data);

      // Assuming response.data contains the updated party data
      dispatch({
         type: CURRENT_PARTIES_TRANSECATIONS_SUCCESS,
         payload: response.data,
      });

      // Dispatch success action if needed
      dispatch({ type: PARTIES_EDIT_SUCCESS });
      
   } catch (error) {
      console.error("Error updating party data:", error);

      // Dispatch failure action if needed
      // dispatch({ type: PARTY_UPDATE_FAILED });
   }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const SaveParty = async (dispatch, data, setPartyFormToggle, toast) => {
   toast.closeAll();
   dispatch({ type: SAVE_PARTY_LOADING });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
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
      setPartyFormToggle((prev) => !prev);
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

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const GetCurrentPartyData = async (
   dispatch,
   data,
   setPartyFormToggle
) => {
   dispatch({ type: SAVE_PARTY_LOADING });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
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
      alert(
         error?.response?.data?.msg ||
            error?.response?.data?.message ||
            "Something Went Wrong!"
      );
   }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const GetAllGroups = async (dispatch, data, setPartyFormToggle) => {
   dispatch({ type: SAVE_PARTY_LOADING });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
   // This request needs to be edited

   try {
      const response = await axios.post(`${API_URL}/${FirmId}/party`, data, {
         headers: {
            Authorization: `Bearer ${token} `,
         },
      });
      console.log("Getting All Groups Response:", response?.data);

      dispatch({ type: SAVE_PARTY_SUCCESS });
      setPartyFormToggle((prev) => !prev);
      // alert("Party Saved ✔️");
   } catch (error) {
      dispatch({ type: SAVE_PARTY_ERROR });
      console.log("Getting All Groups Response:", error);
      alert(
         error?.response?.data?.msg ||
            error?.response?.data?.message ||
            "Something Went Wrong!"
      );
   }
};
