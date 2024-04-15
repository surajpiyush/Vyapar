import { API_URL, USER_DETAILS } from "../store";
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
import { toast } from "react-toastify";
import { LOGOUT } from "../business/action";

// token expire logout automatically
const handleTokenExpiration = (error, navigate) => {
   if (error?.response?.data?.tokenExpired) {
      LOGOUT(navigate, true);
      toast.info("Session Expired! Please Login again.");
      return true;
   }
   return false;
};

// ----------------------- Fetch All Parties Data Function ---- Didn't applied function curring due to thunk error in store.js
export const FetchAllParties = async (dispatch, navigate) => {
   dispatch({ type: FETCH_PARTIES_LOADING });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   // const token =
   //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MTI3NDE2NTAsImV4cCI6MTcxMjgyODA1MH0.ez_9ADGx3uKF1ivIFnKn7E2tm1zC9f0oixDtaT-jv-o";

   try {
      const response = await axios.get(
         `${API_URL}/${FirmId}/party/getAllData`,
         {
            headers: { Authorization: `Bearer ${token} ` },
         }
      );

      // console.log("Fetch All Parties Response", response?.data);
      dispatch({ type: FETCH_PARTIES_SUCCESS, payload: response?.data?.data });
   } catch (error) {
      console.error("Getting All Parties Data Error:", error);
      dispatch({ type: FETCH_PARTIES_ERROR });
      toast.dismiss();
      if (handleTokenExpiration(error, navigate)) {
         return;
      }
   }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const SaveParty = async (dispatch, data, CloseForm,navigate) => {
   toast.dismiss();
   dispatch({ type: SAVE_PARTY_LOADING });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
   // console.log(("data party:-",data))

   try {
      const response = await axios.post(`${API_URL}/${FirmId}/party`, data, {
         headers: { Authorization: `Bearer ${token} ` },
      });
      // console.log("Add Party Response:", response?.data);
      dispatch({ type: SAVE_PARTY_SUCCESS });
      toast.success("New party added.");
      CloseForm(false);
   } catch (error) {
      console.log("Error Adding Party:", error);
      dispatch({ type: SAVE_PARTY_ERROR });
      if (handleTokenExpiration(error,navigate)) {
         return;
      }
      toast.error(
         error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Encountered an error while adding party."
      );
   }
};

// Updating Party Request *********************************************************
export const UpdateParty = async (
   dispatch,
   partyId,
   updatedPartyData,
   setShowEditFirm,
   navigate
) => {
   toast.dismiss();
   dispatch({ type: EDIT_PARTY_LOADING });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.patch(
         `${API_URL}/${FirmId}/party/update/${partyId}`,
         updatedPartyData,
         { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log("Update Party Response:", response.data);
      dispatch({
         type: SUCCESS_GET_CURRENT_PARTY,
         payload: response.data,
      });
      dispatch({ type: SUCCESS_EDIT_PARTY });
      toast.success("Success! Party changes saved.");
      setShowEditFirm(false);
   } catch (error) {
      console.error("Error Updating Party:", error);
      dispatch({ type: EDIT_PARTY_ERROR });
      if (handleTokenExpiration(error,navigate)) {
         return;
      }
      toast.error(
         error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Issue encountered while updating party."
      );
   }
};

// Delete Party Request ************************
export const DeleteParty = async (dispatch, partyId, setShowEditFirm,navigate) => {
   toast.dismiss();
   dispatch({ type: LOADING_DELETE_PARTY });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.delete(
         `${API_URL}/${FirmId}/party/delete/${partyId}`,
         { headers: { Authorization: `Bearer ${token} ` } }
      );
      // console.log("Delete Party Response:", response?.data);
      dispatch({ type: SUCCESS_DELETE_PARTY });
      setShowEditFirm(false);
      toast.success("Party removed from your list.");
   } catch (error) {
      console.log("Deleting Party Error:", error);
      dispatch({ type: ERROR_DELETE_PARTY });
      if (handleTokenExpiration(error,navigate)) {
         return;
      }
      toast.error("Couldn't delete the party.");
   }
};

// Get Current Party Data *********************************************************
export const GetCurrentPartyData = (partyId,navigate) => async (dispatch) => {
   dispatch({ type: LOADING_GET_CURRENT_PARTY });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.get(
         `${API_URL}/${FirmId}/party/${partyId}`,
         {
            headers: { Authorization: `Bearer ${token} ` },
         }
      );

      // console.log("Get Current Party Data Response", response?.data?.data);
      dispatch({
         type: SUCCESS_GET_CURRENT_PARTY,
         payload: response?.data?.data,
      });
   } catch (error) {
      console.error("Error Getting Current Party Data:", error);
      dispatch({ type: ERROR_GET_CURRENT_PARTY });
      toast.dismiss();
      if (handleTokenExpiration(error,navigate)) {
         return;
      }
   }
};
