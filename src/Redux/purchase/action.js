import axios from "axios";
import {
   DELETE_PAYOUTBILL_SUCCESS,
   DELETE_PURCHASEBILL_SUCCESS,
   DELETE_PURCHASEORDER_SUCCESS,
   DELETE_PURCHASERETURN_SUCCESS,
   GET_PAYOUTBILL_SUCCESS,
   GET_PURCHASEBILL_SUCCESS,
   GET_PURCHASEORDER_SUCCESS,
   GET_PURCHASERETURN_SUCCESS,
   POST_PAYOUT_SUCCESS,
   POST_PURCHASEBILL_SUCCESS,
   POST_PURCHASEORDER_SUCCESS,
   POST_PURCHASERETURN_SUCCESS,
   PURCHASE_FAILURE,
   PURCHASE_REQUEST,
   UPDATE_PURCHASEBILL_SUCCESS,
} from "./actionTypes";

const API_URL = "https://asaanly.in";

const getToken = () => localStorage.getItem("token");
const getFirmId = () => JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

const axiosInstance = axios.create({
   baseURL: API_URL,
   headers: {
      Authorization: `Bearer ${getToken()}`,
   },
});

const handleRequestError = (dispatch, err) => {
   console.error(err);
   dispatch({ type: PURCHASE_FAILURE });
};

const handleDeleteSuccess = (dispatch, _id, res) => {
   console.log(res);
   alert(`${res.data.msg}`);
   dispatch({ type: DELETE_PURCHASEBILL_SUCCESS, payload: _id });
};

const handleUpdateSuccess = (dispatch, res) => {
   console.log(res);
   alert(res?.data?.msg);
   dispatch({ type: UPDATE_PURCHASEBILL_SUCCESS });
};

export const addPurchaseBill = (newItem) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   axiosInstance
      .post(`/${getFirmId()}/purchase/create`, newItem)
      .then((res) => {
         console.log("Add Purchase Response:", res.data.data);
         dispatch({ type: POST_PURCHASEBILL_SUCCESS, payload: res.data.data });
         alert("Bill Added ✔️");
      })
      .catch((err) => handleRequestError(dispatch, err));
};

export const getPurchaseBill =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: PURCHASE_REQUEST });

      axiosInstance
         .get(
            `/${getFirmId()}/purchase/getAll?startDate=${
               date.startDate
            }&endDate=${date.endDate}`
         )
         .then((res) => {
            dispatch({ type: GET_PURCHASEBILL_SUCCESS, payload: res.data });
         })
         .catch((err) => handleRequestError(dispatch, err));
   };

export const updatePurchaseBill = (_id, data) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   axiosInstance
      .put(`/${getFirmId()}/purchase/update/${_id}`, data)
      .then((res) => handleUpdateSuccess(dispatch, res))
      .catch((err) => handleRequestError(dispatch, err));
};

export const deletePurchaseBill = (_id) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   axiosInstance
      .delete(`/${getFirmId()}/purchase/delete/${_id}`)
      .then((res) => handleDeleteSuccess(dispatch, _id, res))
      .catch((err) => handleRequestError(dispatch, err));
};

// purchase Order

export const addPurchaseOrder = (newItem) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   axiosInstance
      .post(`/${getFirmId()}/purchaseOrder/create`, newItem)
      .then((res) => {
         console.log("Add Purchase Response:", res.data.data);
         dispatch({ type: POST_PURCHASEORDER_SUCCESS, payload: res.data.data });
         alert("Bill Added ✔️");
      })
      .catch((err) => handleRequestError(dispatch, err));
};

export const getPurchaseOrder =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: PURCHASE_REQUEST });

      axiosInstance
         .get(
            `/${getFirmId()}/purchaseOrder/getAll?startDate=${
               date.startDate
            }&endDate=${date.endDate}`
         )
         .then((res) => {
            dispatch({ type: GET_PURCHASEORDER_SUCCESS, payload: res.data });
         })
         .catch((err) => handleRequestError(dispatch, err));
   };

export const updatePurchaseOrderBill = (_id, data) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   axiosInstance
      .put(`/${getFirmId()}/purchaseOrder/update/${_id}`, data)
      .then((res) => handleUpdateSuccess(dispatch, res))
      .catch((err) => handleRequestError(dispatch, err));
};

export const deletePurchaseOrderBill = (_id) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   axiosInstance
      .delete(`/${getFirmId()}/purchaseOrder/delete/${_id}`)
      .then((res) => handleDeleteSuccess(dispatch, _id, res))
      .catch((err) => handleRequestError(dispatch, err));
};

// ---------------------------------------------------------------
// Purchase paymentOut Bills

export const addPayOut = (newItem) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   axiosInstance
      .post(`/${getFirmId()}/purchaseOut/create`, newItem)
      .then((res) => {
         console.log("Add Purchase Response:", res.data.data);
         dispatch({ type: POST_PAYOUT_SUCCESS, payload: res.data.data });
         alert("Bill Added ✔️");
      })
      .catch((err) => handleRequestError(dispatch, err));
};

export const getPaymentOutBill =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: PURCHASE_REQUEST });

      axiosInstance
         .get(
            `/${getFirmId()}/purchaseOut/getAll?startDate=${
               date.startDate
            }&endDate=${date.endDate}`
         )
         .then((res) => {
            dispatch({ type: GET_PAYOUTBILL_SUCCESS, payload: res.data });
         })
         .catch((err) => handleRequestError(dispatch, err));
   };

export const updatePayoutBill = (_id, data) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   axiosInstance
      .put(`/${getFirmId()}/purchaseOut/update/${_id}`, data)
      .then((res) => handleUpdateSuccess(dispatch, res))
      .catch((err) => handleRequestError(dispatch, err));
};

export const deletePayoutBill = (_id) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   axiosInstance
      .delete(`/${getFirmId()}/purchaseOut/delete/${_id}`)
      .then((res) => handleDeleteSuccess(dispatch, _id, res))
      .catch((err) => handleRequestError(dispatch, err));
};

// -------------------------------------------------
// Purchse Returnbills

export const addPurchaseReturn = (newItem) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   axiosInstance
      .post(`/${getFirmId()}/purchaseReturn/create`, newItem)
      .then((res) => {
         console.log("Add Purchase Response:", res.data.data);
         dispatch({
            type: POST_PURCHASERETURN_SUCCESS,
            payload: res.data.data,
         });
         alert("Bill Added ✔️");
      })
      .catch((err) => handleRequestError(dispatch, err));
};

export const getPurchaseReturn =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: PURCHASE_REQUEST });

      axiosInstance
         .get(
            `/${getFirmId()}/purchaseReturn/getAll?startDate=${
               date.startDate
            }&endDate=${date.endDate}`
         )
         .then((res) => {
            dispatch({ type: GET_PURCHASERETURN_SUCCESS, payload: res.data });
         })
         .catch((err) => handleRequestError(dispatch, err));
   };

export const updatePurchaseReturnBill = (_id, data) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });
console.log("data for update:-",data)
   axiosInstance
      .put(`/${getFirmId()}/purchaseReturn/update/${_id}`, data)
      .then((res) => handleUpdateSuccess(dispatch, res))
      .catch((err) => handleRequestError(dispatch, err));
};

export const deletePurchaseReturnBill = (_id) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   axiosInstance
      .delete(`/${getFirmId()}/purchaseReturn/delete/${_id}`)
      .then((res) => handleDeleteSuccess(dispatch, _id, res))
      .catch((err) => handleRequestError(dispatch, err));
};
