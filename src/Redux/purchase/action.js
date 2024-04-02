import { API_URL } from "../store";
import {
  ADD_PURCHASE_ERROR,
  ADD_PURCHASE_LOADING,
  ADD_PURCHASE_SUCCESS,
  DELETE_PAYOUTBILL_SUCCESS,
  DELETE_PURCHASEBILL_SUCCESS,
  DELETE_PURCHASEORDER_SUCCESS,
  DELETE_PURCHASERETURN_SUCCESS,
  GET_ALL_PAYMENT_OUT_ERROR,
  GET_ALL_PAYMENT_OUT_LOADING,
  GET_ALL_PAYMENT_OUT_SUCCESS,
  GET_ALL_PURCHASE_BILL_ERROR,
  GET_ALL_PURCHASE_BILL_LOADING,
  GET_ALL_PURCHASE_BILL_SUCCESS,
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

// -------------------------------- PURCHASE BILL ----------------------------
// Add Purchase Bill Request
export const AddPurchaseBill = async (
  dispatch,
  newItem,
  setOpenForm,
  toast
) => {
  dispatch({ type: ADD_PURCHASE_LOADING });
  toast.closeAll();
  const token = localStorage.getItem("token");
  const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  try {
    const response = await axios.post(
      `${API_URL}/${firmId}/purchase/create`,
      newItem,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Add Purchase Response:", response);
    dispatch({
      type: ADD_PURCHASE_SUCCESS,
      payload: response.data.data,
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
    dispatch({ type: ADD_PURCHASE_ERROR });
    console.log("Adding Purchase Bill Error:", error);
  }
};

// Get All Purchase Bill
export const GetAllPurchaseBill = async (dispatch, startDate, endDate) => {
  dispatch({ type: GET_ALL_PURCHASE_BILL_LOADING });
  const token = localStorage.getItem("token");
  const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/purchase/getAll?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Getting All Purchase Bill Response:", response);
    dispatch({
      type: GET_ALL_PURCHASE_BILL_SUCCESS,
      payload: response?.data?.data || [],
    });
  } catch (error) {
    dispatch({ type: GET_ALL_PURCHASE_BILL_ERROR });
    console.error("Getting All Purchase Bill Error:", error);
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

// Add purchase Order
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
    // console.log("BIll Addeed in purchase order ",response.data.data)
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

// -------------------------------- PAYMENT OUT ----------------------------
// Add Payment Out
export const addPayOut = async (dispatch, newItem, setOpenForm, toast) => {
  toast.closeAll();
  dispatch({ type: PURCHASE_REQUEST });
  const token = localStorage.getItem("token");
  const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  try {
    const response = await axios.post(
      `${API_URL}/${firmId}/purchaseOut/create`,
      newItem,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Add Payment Out Response", response);
    dispatch({ type: POST_PAYOUT_SUCCESS });
    toast({
      title: "Purchase Out Added!",
      status: "success",
      position: "top",
    });
    setOpenForm(false);
  } catch (error) {
    dispatch({ type: PURCHASE_FAILURE });
    toast({
      description:
        error?.response?.data?.msg || error?.response?.data?.message || "",
      title: "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Add Payment Out Error", error);
  }
};

// Get All Payment Out
export const GetAllPaymentOut = async (dispatch, startDate, endDate) => {
  dispatch({ type: GET_ALL_PAYMENT_OUT_LOADING });
  const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/purchaseOut/getAll?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    console.log("Get All Payment Out Response:", response);
    dispatch({
      type: GET_ALL_PAYMENT_OUT_SUCCESS,
      payload: response?.data?.data || [],
    });
  } catch (error) {
    dispatch({ type: GET_ALL_PAYMENT_OUT_ERROR });
    console.error("Get All Payment Out Error:", error);
  }
};

export const updatePayoutBill = async (
  dispatch,
  dataId,
  data,
  toast,
  setIsEditing,
  setEditedData
) => {
  toast.closeAll();
  dispatch({ type: PURCHASE_REQUEST });
  const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${API_URL}/${firmId}/purchaseOut/update/${dataId}`,
      data,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Update Payment-Out Response:",response);
    dispatch({ type: UPDATE_PAYOUTBILL_SUCCESS });
    toast({
      title: "Payment-Out Updated",
      status: "success",
      position: "top",
    });
    setIsEditing(false);
    setEditedData({});
  } catch (error) {
    toast({
      description:
        error?.response?.data?.msg || error?.response?.data?.message || "",
      title: "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: PURCHASE_FAILURE });
    console.log("Update Payment-Out Error:", error);
  }
};

export const deletePayoutBill = async (
  dispatch,
  dataId,
  toast,
  setIsEditing,
  setEditedData
) => {
  toast.closeAll();
  dispatch({ type: PURCHASE_REQUEST });
  const firmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${API_URL}/${firmId}/purchaseOut/delete/${dataId}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Delete Payment-Out Response:",response);
    dispatch({ type: DELETE_PAYOUTBILL_SUCCESS });
    toast({
      title: "Payment-Out Deleted",
      status: "success",
      position: "top",
    });
    setIsEditing(false);
    setEditedData({});
  } catch (error) {
    toast({
      description:
        error?.response?.data?.msg || error?.response?.data?.message || "",
      title: "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: PURCHASE_FAILURE });
    console.log("Delete Payment-Out Error:", error);
  }
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
