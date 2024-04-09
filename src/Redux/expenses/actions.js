import { API_URL, USER_DETAILS } from "../store";

import axios from "axios";
import {
  ERROR_DELETE_EXPENSE,
   FETCH_EXPENSES_ERROR,
   FETCH_EXPENSES_LOADING,
   FETCH_EXPENSES_SUCCESS,
   LOADING_DELETE_EXPENSE,
   SAVE_EXPENSE_ERROR,
   SAVE_EXPENSE_LOADING,
   SAVE_EXPENSE_SUCCESS,
   SUCCESS_DELETE_EXPENSE,
} from "./actionTypes";

// ----------------------- Fetch All Expense Data Function ---- Didn't applied function curring due to thunk error in store.js
export const FetchAllExpensesCategory = async (dispatch) => {
   dispatch({ type: FETCH_EXPENSES_LOADING });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.get(`${API_URL}/${FirmId}/expenseCategory/allExpenseCategory`, {
         headers: {
            Authorization: `Bearer ${token} `,
         },
      });

       console.log("Fetch All Expense Response", response?.data); 
      dispatch({ type: FETCH_EXPENSES_SUCCESS, payload: response?.data?.data });
   } catch (error) {
      dispatch({ type: FETCH_EXPENSES_ERROR });
      console.error("Getting All Expense Data Error:", error);
   }
};

// ------------------------- Save Expense Function ---- Didn't applied function curring due to thunk error in store.js
export const SaveExpense = async (dispatch, data, CloseForm, toast) => {
   toast.closeAll();
   dispatch({ type: SAVE_EXPENSE_LOADING });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.post(`${API_URL}/${FirmId}/expenseCategory/createCategoryName`, data, {
         headers: {
            Authorization: `Bearer ${token} `,
         },
      });
      // console.log("Save Party Response:", response?.data);
      dispatch({ type: SAVE_EXPENSE_SUCCESS });
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
      dispatch({ type: SAVE_EXPENSE_ERROR });
      console.log("Saving Party Error Response:", error);
   }
};

// Delete Party Request ************************
export const DeleteParty = async (
   dispatch,
   expenseId,
   setShowEditFirm,
   toast
) => {
   toast.closeAll();
   dispatch({ type: LOADING_DELETE_EXPENSE });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.delete(
         `${API_URL}/${FirmId}/expense/delete/${expenseId}`,
         {
            headers: {
               Authorization: `Bearer ${token} `,
            },
         }
      );
      console.log("Delete Expense Response:", response?.data);
      dispatch({ type: SUCCESS_DELETE_EXPENSE });
      setShowEditFirm(false);
      toast({
         title: "Expense Deleted",
         status: "success",
         position: "top",
      });
   } catch (error) {
      dispatch({ type: ERROR_DELETE_EXPENSE});
      console.log("Deleting Expense Error:", error);
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
// export const GetCurrentPartyData = (partyId) => async (dispatch) => {
//    dispatch({ type: LOADING_GET_CURRENT_PARTY });
//    const token = localStorage.getItem("token");
//    const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

//    try {
//       const response = await axios.get(
//          `${API_URL}/${FirmId}/party/${partyId}`,
//          {
//             headers: { Authorization: `Bearer ${token} ` },
//          }
//       );

//       // console.log("Get Current Party Data Response", response?.data?.data);
//       dispatch({
//          type: SUCCESS_GET_CURRENT_PARTY,
//          payload: response?.data?.data,
//       });
//    } catch (error) {
//       dispatch({ type: ERROR_GET_CURRENT_PARTY });
//       console.error("Error Getting Current Party Data:", error);
//    }
// };
