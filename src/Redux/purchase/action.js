import { API_URL } from "../store";
import {
   DELETE_PAYOUTBILL_SUCCESS,
   DELETE_PURCHASEBILL_SUCCESS,
   DELETE_PURCHASEORDER_SUCCESS,
   DELETE_PURCHASERETURN_SUCCESS,
   GET_PAYOUTBILL_SUCCESS,
   GET_PURCHASEBILL_SUCCESS,
   GET_PURCHASEORDER_SUCCESS,
   GET_PURCHASERETURN_SUCCESS,
   GET_SINGLE_PURCHASEBILL_SUCCESS,
   POST_PAYOUT_SUCCESS,
   POST_PURCHASEBILL_SUCCESS,
   POST_PURCHASEORDER_SUCCESS,
   POST_PURCHASERETURN_SUCCESS,
   PURCHASE_FAILURE,
   PURCHASE_REQUEST,
   UPDATE_PAYOUTBILL_SUCCESS,
   UPDATE_PURCHASEBILL_SUCCESS,
   UPDATE_PURCHASEORDER_SUCCESS,
   UPDATE_PURCHASERETURN_SUCCESS,
} from "./actionTypes";

import axios from "axios";

// Add Purchase Bill Request
export const addPurchaseBill = async (
   dispatch,
   newItem,
   setOpenForm,
   toast
) => {
   toast.closeAll();
   dispatch({ type: PURCHASE_REQUEST });

   try {
      const token = localStorage.getItem("token");
      const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
      const response = await axios.post(
         `${API_URL}/${firmId}/purchase/create`,
         newItem,
         { headers: { Authorization: `Bearer ${token} ` } }
      );

      dispatch({
         type: POST_PURCHASEBILL_SUCCESS,
         payload: response.data.data,
      });
      setOpenForm(false);
      toast({
         title: "Purchase Bill Added!",
         status: "success",
         position: "top",
      });
   } catch (error) {
      toast({
         title:
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
            "Something Went Wrong!",
         status: "error",
         position: "top",
      });
      dispatch({ type: PURCHASE_FAILURE });
      console.log("Adding Purchase Bill Error:", error);
   }
};

// Get Single Purchase Bill Data
export const GetSinglePurchaseBillData = async (dispatch, itemId, toast) => {
   // dispatch({ type: PURCHASE_REQUEST });

   const token = localStorage.getItem("token");
   const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

   try {
      const response = await axios.get(
         `${API_URL}/${firmId}/purchase/getInvoice/${itemId}`,
         {
            headers: {
               Authorization: `Bearer ${token} `,
            },
         }
      );
      console.log("Get Single Purchase bill Data:", response?.data);
      dispatch({
         type: GET_SINGLE_PURCHASEBILL_SUCCESS,
         payload: response.data,
      });
   } catch (error) {
      dispatch({ type: PURCHASE_FAILURE });
      toast.closeAll();
      toast({
         title: "Encountered an issue while printing the Invoice.",
         description: "Please try again later!",
         status: "error",
         position: "top",
      });
      console.log("Error Getting Single Invoice:", error);
   }
};

// Get All Purchase Bill
export const getPurchaseBill =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: PURCHASE_REQUEST });
      const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
      const token = localStorage.getItem("token");

      axios
         .get(
            `${API_URL}/${firmId}/purchase/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
            { headers: { Authorization: `Bearer ${token} ` } }
         )
         .then((res) => {
            console.log(res);
            dispatch({ type: GET_PURCHASEBILL_SUCCESS, payload: res.data });
         })
         .catch((err) => {
            dispatch({ type: PURCHASE_FAILURE });
            console.error("Getting All Purchase Bill Error:", err);
         });
   };

// Update Purchase Bill
export const updatePurchaseBill = (_id, data) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });
   const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const token = localStorage.getItem("token");

   axios
      .put(`${API_URL}/${firmId}/purchase/update/${_id}`, data, {
         headers: { Authorization: `Bearer ${token} ` },
      })
      .then((res) => {
         console.log("Update Purchase Bill Response:", res);
         dispatch({ type: UPDATE_PURCHASEBILL_SUCCESS });
         alert(res?.data?.msg);
      })
      .catch((err) => {
         dispatch({ type: PURCHASE_FAILURE });
         console.error("Update Purchase Bill Error:", err);
      });
};

// Delete Purchase Bill
export const deletePurchaseBill = (_id, toast) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });
   const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const token = localStorage.getItem("token");

   axios
      .delete(`${API_URL}/${firmId}/purchase/delete/${_id}`, {
         headers: { Authorization: `Bearer ${token} ` },
      })
      .then((res) => {
         dispatch({ type: DELETE_PURCHASEBILL_SUCCESS, payload: _id });
         toast({
            title: `${res.data.msg}`,
            status: "success",
            position: "top",
         });
      })
      .catch((err) => {
         dispatch({ type: PURCHASE_FAILURE });
         console.error("Deleting Purchase Bill Error:", err);
      });
};

// purchase Order
export const addPurchaseOrder = async (
   dispatch,
   newItem,
   setOpenForm,
   toast
) => {
   toast.closeAll();
   dispatch({ type: PURCHASE_REQUEST });
   const token = localStorage.getItem("token");
   const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

   try {
      const response = await axios.post(
         `${API_URL}/${firmId}/purchaseOrder/create`,
         newItem,
         { headers: { Authorization: `Bearer ${token} ` } }
      );

      dispatch({
         type: POST_PURCHASEORDER_SUCCESS,
         payload: response?.data?.data || [],
      });
      toast({
         title: "Purchase Bill Added!",
         status: "success",
         position: "top",
      });
      setOpenForm(false);
   } catch (error) {
      toast({
         title:
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
            "Something Went Wrong!",
         status: "error",
         position: "top",
      });
      dispatch({ type: PURCHASE_FAILURE });
      console.log("Post Sales Invoice Response:", error);
   }
};

export const getPurchaseOrder =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: PURCHASE_REQUEST });

      const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
      const token = localStorage.getItem("token");

      axios
         .get(
            `${API_URL}/${firmId}/purchaseOrder/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
            {
               headers: {
                  Authorization: `Bearer ${token} `,
               },
            }
         )
         .then((res) => {
            dispatch({ type: GET_PURCHASEORDER_SUCCESS, payload: res.data });
         })
         .catch((err) => {
            console.error(err);
            dispatch({ type: PURCHASE_FAILURE });
         });
   };

export const updatePurchaseOrderBill = (_id, data) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const token = localStorage.getItem("token");

   axios
      .put(`${API_URL}/${firmId}/purchaseOrder/update/${_id}`, data, {
         headers: {
            Authorization: `Bearer ${token} `,
         },
      })
      .then((res) => {
         console.log(res);
         alert(res?.data?.msg);
         dispatch({ type: UPDATE_PURCHASEORDER_SUCCESS });
      })
      .catch((err) => {
         console.error(err);
         dispatch({ type: PURCHASE_FAILURE });
      });
};

export const deletePurchaseOrderBill = (_id, toast) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const token = localStorage.getItem("token");

   axios
      .delete(`${API_URL}/${firmId}/purchaseOrder/delete/${_id}`, {
         headers: {
            Authorization: `Bearer ${token} `,
         },
      })
      .then((res) => {
         dispatch({ type: DELETE_PURCHASEORDER_SUCCESS, payload: _id });

         toast({
            title: `${res.data.msg}`,
            status: "success",
            position: "top",
         });
      })
      .catch((err) => {
         console.error(err);
         dispatch({ type: PURCHASE_FAILURE });
      });
};

// ---------------------------------------------------------------
// Purchase paymentOut Bills

export const addPayOut = async (dispatch, newItem, setOpenForm, toast) => {
   toast.closeAll();
   dispatch({ type: PURCHASE_REQUEST });

   try {
      const token = localStorage.getItem("token");
      const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
      const response = await axios.post(
         `${API_URL}/${firmId}/purchaseOut/create`,
         newItem,
         {
            headers: {
               Authorization: `Bearer ${token} `,
            },
         }
      );

      dispatch({
         type: POST_PAYOUT_SUCCESS,
         payload: response.data.data,
      });

      setOpenForm(false);
      toast({
         title: "Purchase Bill Added!",
         status: "success",
         position: "top",
      });
   } catch (error) {
      console.error(error);
      dispatch({ type: PURCHASE_FAILURE });

      toast({
         title:
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
            "Something Went Wrong!",
         status: "error",
         position: "top",
      });
      console.log("Post Sales Invoice Response:", error);
   }
};

export const getPaymentOutBill =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: PURCHASE_REQUEST });

      const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
      const token = localStorage.getItem("token");

      axios
         .get(
            `${API_URL}/${firmId}/purchaseOut/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
            {
               headers: {
                  Authorization: `Bearer ${token} `,
               },
            }
         )
         .then((res) => {
            dispatch({ type: GET_PAYOUTBILL_SUCCESS, payload: res.data });
         })
         .catch((err) => {
            console.error(err);
            dispatch({ type: PURCHASE_FAILURE });
         });
   };

export const updatePayoutBill = (_id, data) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const token = localStorage.getItem("token");

   axios
      .put(`${API_URL}/${firmId}/purchaseOut/update/${_id}`, data, {
         headers: {
            Authorization: `Bearer ${token} `,
         },
      })
      .then((res) => {
         console.log(res);
         alert(res?.data?.msg);
         dispatch({ type: UPDATE_PAYOUTBILL_SUCCESS });
      })
      .catch((err) => {
         console.error(err);
         dispatch({ type: PURCHASE_FAILURE });
      });
};

export const deletePayoutBill = (_id, toast) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });
   console.log(_id);
   const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const token = localStorage.getItem("token");

   axios
      .delete(`${API_URL}/${firmId}/purchaseOut/delete/${_id}`, {
         headers: {
            Authorization: `Bearer ${token} `,
         },
      })
      .then((res) => {
         dispatch({ type: DELETE_PAYOUTBILL_SUCCESS, payload: _id });

         toast({
            title: `${res.data.msg}`,
            status: "success",
            position: "top",
         });
      })
      .catch((err) => {
         console.error(err);
         dispatch({ type: PURCHASE_FAILURE });
      });
};

// -------------------------------------------------
// Purchse Returnbills

export const addPurchaseReturn = async (
   dispatch,
   newItem,
   setOpenForm,
   toast
) => {
   toast.closeAll();
   dispatch({ type: PURCHASE_REQUEST });

   try {
      const token = localStorage.getItem("token");
      const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
      const response = await axios.post(
         `${API_URL}/${firmId}/purchaseReturn/create`,
         newItem,
         {
            headers: {
               Authorization: `Bearer ${token} `,
            },
         }
      );

      dispatch({
         type: POST_PURCHASERETURN_SUCCESS,
         payload: response.data.data,
      });

      setOpenForm(false);
      toast({
         title: "Purchase Bill Added!",
         status: "success",
         position: "top",
      });
   } catch (error) {
      console.error(error);
      dispatch({ type: PURCHASE_FAILURE });

      toast({
         title:
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
            "Something Went Wrong!",
         status: "error",
         position: "top",
      });
      console.log("Post Sales Invoice Response:", error);
   }
};

export const getPurchaseReturn =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: PURCHASE_REQUEST });

      const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
      const token = localStorage.getItem("token");

      axios
         .get(
            `${API_URL}/${firmId}/purchaseReturn/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
            {
               headers: {
                  Authorization: `Bearer ${token} `,
               },
            }
         )
         .then((res) => {
            dispatch({ type: GET_PURCHASERETURN_SUCCESS, payload: res.data });
         })
         .catch((err) => {
            console.error(err);
            dispatch({ type: PURCHASE_FAILURE });
         });
   };

export const updatePurchaseReturnBill = (_id, data) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const token = localStorage.getItem("token");

   axios
      .put(`${API_URL}/${firmId}/purchaseReturn/update/${_id}`, data, {
         headers: {
            Authorization: `Bearer ${token} `,
         },
      })
      .then((res) => {
         console.log(res);
         alert(res?.data?.msg);
         dispatch({ type: UPDATE_PURCHASERETURN_SUCCESS });
      })
      .catch((err) => {
         console.error(err);
         dispatch({ type: PURCHASE_FAILURE });
      });
};

export const deletePurchaseReturnBill = (_id, toast) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const token = localStorage.getItem("token");

   axios
      .delete(`${API_URL}/${firmId}/purchaseReturn/delete/${_id}`, {
         headers: {
            Authorization: `Bearer ${token} `,
         },
      })
      .then((res) => {
         dispatch({ type: DELETE_PURCHASERETURN_SUCCESS, payload: _id });

         toast({
            title: `${res.data.msg}`,
            status: "success",
            position: "top",
         });
      })
      .catch((err) => {
         console.error(err);
         dispatch({ type: PURCHASE_FAILURE });
      });
};
